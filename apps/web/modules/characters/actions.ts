"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { AddCharacterSchema, charactersSchema } from "./schemas";

export async function fetchCharacters() {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("characters").select("*");

  if (error) throw new Error(error.message);

  return assertZodParse(charactersSchema, data ?? []);
}

export async function addCharacter(formData: FormData) {
  const { supabase } = await getUserScopedQuery();

  const raw = Object.fromEntries(formData.entries());
  const parsed = assertZodParse(AddCharacterSchema, raw);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("characters")
    .insert([{ user_id: user.id, ...parsed }])
    .select();

  if (error) throw new Error(error.message);

  const validated = assertZodParse(charactersSchema, data ?? []);

  revalidatePath("/dashboard");
  return { success: true, data: validated };
}

export async function deleteCharacter(id: string) {
  const { supabase } = await getUserScopedQuery();

  const parsed = assertZodParse(z.object({ id: z.string().uuid() }), { id });

  const { error } = await supabase.from("characters").delete().eq("id", parsed.id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
  return { success: true };
}

export async function getWorlds() {
  const data = await fetch("https://api.tibiadata.com/v4/worlds");
  const worlds = await data.json();

  return worlds;
}
