import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActiveCharacter } from "@/modules/characters/providers/ActiveCharacterProvider";
import { mapHuntSessionToForm } from "../mappers/mapHuntSessionToForm";
import { type HuntSession, type HuntSessionForm, HuntSessionFormSchema } from "../schemas";

const startDate = new Date().toISOString().slice(0, 10);

const getDefaultValues = ({
  placeId,
}: {
  placeId: HuntSessionForm["place_id"];
}): HuntSessionForm => ({
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
  killed_monsters: [],
  supplies: [],
  damage_elements: [],
  monster_damage_sources: [],
  looted_items: [],
});

export function useHuntSessionForm({
  huntSession,
  placeId,
}: {
  huntSession?: HuntSession | null;
  placeId: number;
}) {
  const { activeCharacter } = useActiveCharacter();

  const baseValues = huntSession
    ? mapHuntSessionToForm(huntSession)
    : getDefaultValues({ placeId });

  return useForm<HuntSessionForm>({
    resolver: zodResolver(HuntSessionFormSchema),
    defaultValues: {
      ...baseValues,
      level: huntSession?.level ?? activeCharacter?.level ?? 0,
    },
    shouldUnregister: false,
  });
}
