import { zodResolver } from "@hookform/resolvers/zod";
import type { HuntSession } from "@repo/database";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActiveCharacter } from "@/modules/characters";
import { mapHuntSessionToForm } from "../mappers/mapHuntSessionToForm";
import { type HuntSessionForm, HuntSessionFormSchema } from "../schemas";

const startDate = new Date().toISOString().slice(0, 10);

export const HUNT_SESSION_FORM_DEFAULT_VALUES: HuntSessionForm = {
  damage: 0,
  healing: 0,
  place_id: 1,
  date: startDate,
  started_at: startDate,
  ended_at: startDate,
  level: 300,
  raw_xp_gain: 0,
  xp_gain: 0,
  profit: 0,
  loot_value: 0,
  supplies_cost: 0,
  duration_seconds: 0,
  player_count: 1,
  killed_monsters: [],
  supplies: [],
  damage_elements: [],
  monster_damage_sources: [],
  looted_items: [],
};

export function useHuntSessionForm(huntSession?: HuntSession) {
  const { activeCharacter } = useActiveCharacter();

  const form = useForm<HuntSessionForm>({
    resolver: zodResolver(HuntSessionFormSchema),
    defaultValues: {
      ...HUNT_SESSION_FORM_DEFAULT_VALUES,
      level: activeCharacter?.level ?? 0,
    },
  });

  useEffect(() => {
    if (huntSession) {
      form.reset(mapHuntSessionToForm(huntSession));
    } else {
      form.reset({
        ...HUNT_SESSION_FORM_DEFAULT_VALUES,
        level: activeCharacter?.level ?? 0,
      });
    }
  }, [huntSession, form.reset, activeCharacter?.level]);

  return form;
}
