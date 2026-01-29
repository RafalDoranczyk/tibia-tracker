import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { mapHuntSessionToFormValues } from "../mappers/mapHuntSessionToFormValues";
import { HuntSessionFormSchema } from "../schemas";
import type { HuntSession, HuntSessionFormValues } from "../types";

const startDate = new Date().toISOString().slice(0, 10);

const getDefaultValues = ({
  placeId,
}: { placeId: HuntSessionFormValues["place_id"] }): HuntSessionFormValues => ({
  damage: 0,
  healing: 0,
  place_id: placeId,
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
  monsters: [],
  supplies: [],
  damage_elements: [],
  damage_sources: [],
  items: [],
});

export function useHuntSessionForm({
  huntSession,
  placeId,
}: {
  huntSession?: HuntSession | null;
  placeId: number;
}) {
  return useForm<HuntSessionFormValues>({
    resolver: zodResolver(HuntSessionFormSchema),
    defaultValues: huntSession
      ? mapHuntSessionToFormValues(huntSession)
      : getDefaultValues({ placeId }),
    shouldUnregister: false,
  });
}
