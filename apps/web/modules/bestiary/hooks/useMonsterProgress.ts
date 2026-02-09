"use client";

import { useState } from "react";

import { useRequiredCharacterId } from "@/modules/characters";
import { useToast } from "@/providers/app";

import { updateCharacterBestiaryAction } from "../actions/updateCharacterBestiary";
import { BESTIARY_STAGE } from "../constants";
import type { MonsterWithCharacterProgress } from "../schemas";
import { getBestiaryStage } from "../utils/getBestiaryStage";

export function useMonsterProgress(monsterToUpdate: MonsterWithCharacterProgress) {
  const toast = useToast();
  const characterId = useRequiredCharacterId();

  const [monster, setMonster] = useState(monsterToUpdate);
  const [isLoading, setIsLoading] = useState(false);

  const isBestiaryCompleted = monster.stage === BESTIARY_STAGE.COMPLETED;

  const runUpdate = async (
    updates: Partial<MonsterWithCharacterProgress>,
    successMessage?: string
  ) => {
    setIsLoading(true);
    const prev = monster;
    setMonster((m) => ({ ...m, ...updates }));

    try {
      await updateCharacterBestiaryAction({
        characterId,
        monsterId: monster.id,
        updates,
      });
      successMessage && toast.success(successMessage);
    } catch {
      setMonster(prev);
      toast.error(`Failed to update ${monster.name}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSoulpit = () => {
    return runUpdate({ has_soul: !monster.has_soul }, `Soulpit for ${monster.name} saved`);
  };

  const toggleFullBestiary = () => {
    const newKills = monster.stage === BESTIARY_STAGE.COMPLETED ? 0 : monster.bestiary_kills.stage3;
    const newStage = getBestiaryStage(newKills, monster.bestiary_kills);

    return runUpdate({ kills: newKills, stage: newStage }, `Bestiary for ${monster.name} saved`);
  };

  const saveKills = (kills: number) => {
    const newStage = getBestiaryStage(kills, monster.bestiary_kills);

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
