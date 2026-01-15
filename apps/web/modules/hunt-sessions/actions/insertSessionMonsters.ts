"use server";

import { z } from "zod";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

const ParsedMonsterSchema = z.object({
  name: z.string().min(1),
  count: z.number().int().min(1),
});

type ParsedMonster = z.infer<typeof ParsedMonsterSchema>;

export async function insertSessionMonstersByName(sessionId: number, monsters: ParsedMonster[]) {
  const parsed = assertZodParse(ParsedMonsterSchema.array(), monsters);
  if (!parsed.length) return;

  const { supabase } = await getUserScopedQuery();

  // Pobierz wszystkie potwory z bazy
  const { data: allMonsters, error } = await supabase.from("monsters").select("id, name");
  if (error) throw new Error(error.message);

  // Utwórz mapę: nazwa (lowercase) → id
  const nameToId = new Map(allMonsters.map((m) => [m.name.toLowerCase(), m.id]));

  // Przefiltruj tylko te, które istnieją
  const validPayload = parsed
    .map((m) => {
      const id = nameToId.get(m.name.toLowerCase());
      if (!id) return null; // nieznany potwór
      return {
        session_id: sessionId,
        monster_id: id,
        count: m.count,
      };
    })
    .filter(Boolean);

  if (!validPayload.length) return;

  const { error: insertError } = await supabase.from("session_monsters").insert(validPayload);

  if (insertError) throw new Error(insertError.message);

  // Dla debugowania:
  const missing = parsed.filter((m) => !nameToId.has(m.name.toLowerCase())).map((m) => m.name);
  if (missing.length) console.warn("❗ Nie znaleziono potworów:", missing);
}
