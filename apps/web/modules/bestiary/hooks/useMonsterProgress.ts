"use client";

import { useState } from "react";

import { useToast } from "@/hooks";
import { useRequiredCharacterId } from "@/modules/characters";

import { updateCharacterBestiary } from "../actions/updateCharacterBestiary";
import {
  BESTIARY_STAGE,
  type MonsterWithCharacterProgress,
  type UpdateCharacterBestiaryPayload,
} from "../schemas";
import { calculateBestiaryStage } from "../utils/calculateBestiaryStage";

export function useMonsterProgress(monsterToUpdate: MonsterWithCharacterProgress) {
  const toast = useToast();
  const characterId = useRequiredCharacterId();

  const [monster, setMonster] = useState(monsterToUpdate);
  const [isLoading, setIsLoading] = useState(false);

  const isBestiaryCompleted = monster.stage === BESTIARY_STAGE.COMPLETED;

  const runUpdate = async (
    updates: Partial<UpdateCharacterBestiaryPayload>,
    successMessage?: string
  ) => {
    setIsLoading(true);
    const prev = monster;

    // Optimistic UI update
    setMonster((m) => ({ ...m, ...updates }));

    try {
      await updateCharacterBestiary({
        character_id: characterId,
        monster_id: monster.id,
        kills: updates.kills ?? monster.kills,
        stage: updates.stage ?? monster.stage,
        has_soul: updates.has_soul ?? monster.has_soul,
      });

      if (successMessage) toast.success(successMessage);
    } catch {
      setMonster(prev); // Rollback w przypadku błędu
      toast.error(`Failed to update ${monster.name}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSoulpit = () => {
    return runUpdate({ has_soul: !monster.has_soul }, `Soulpit for ${monster.name} saved`);
  };

  const toggleFullBestiary = () => {
    const newKills = monster.stage === BESTIARY_STAGE.COMPLETED ? 0 : monster.bestiary_kills.stage3;
    const newStage = calculateBestiaryStage(newKills, monster.bestiary_kills);

    return runUpdate({ kills: newKills, stage: newStage }, `Bestiary for ${monster.name} saved`);
  };

  const saveKills = (kills: number) => {
    const newStage = calculateBestiaryStage(kills, monster.bestiary_kills);

    return runUpdate({ kills, stage: newStage }, `Kills for ${monster.name} saved`);
  };

  return {
    monster,
    isLoading,
    isBestiaryCompleted,

    // domain actions
    toggleSoulpit,
    toggleFullBestiary,
    saveKills,
  };
}
