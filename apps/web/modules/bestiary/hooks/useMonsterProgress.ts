"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks";
import { useRequiredCharacterId } from "@/modules/characters";
import { updateCharacterBestiary } from "../actions/update-character-bestiary";
import {
  BESTIARY_STAGE,
  type MonsterWithCharacterProgress,
  type UpdateCharacterBestiaryPayload,
} from "../schemas";
import { calculateBestiaryStage } from "../utils/calculateBestiaryStage";

export function useMonsterProgress(monsterFromProps: MonsterWithCharacterProgress) {
  const toast = useToast();
  const characterId = useRequiredCharacterId();

  const [monster, setMonster] = useState(monsterFromProps);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMonster(monsterFromProps);
  }, [monsterFromProps]);

  const isBestiaryCompleted = monster.stage === BESTIARY_STAGE.COMPLETED;

  const runUpdate = async (
    updates: Partial<UpdateCharacterBestiaryPayload>,
    options?: { showLoading?: boolean; successMessage?: string }
  ) => {
    const { showLoading = true, successMessage } = options || {};

    const previousState = monster;

    setMonster((prev) => ({ ...prev, ...updates }));

    if (showLoading) setIsLoading(true);

    try {
      await updateCharacterBestiary({
        character_id: characterId,
        monster_id: monster.id,
        kills: updates.kills ?? monster.kills,
        stage: updates.stage ?? monster.stage,
        has_soul: updates.has_soul ?? monster.has_soul,
        bestiary_class: monster.bestiary_class,
      });

      if (successMessage) toast.success(successMessage);
    } catch {
      setMonster(previousState);
      toast.error(`Failed to update ${monster.name}.`);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const toggleSoulpit = () => {
    return runUpdate(
      { has_soul: !monster.has_soul },
      { showLoading: false, successMessage: `Soulpit for ${monster.name} saved` }
    );
  };

  const toggleFullBestiary = () => {
    const isNowCompleted = monster.stage === BESTIARY_STAGE.COMPLETED;
    const newKills = isNowCompleted ? 0 : monster.bestiary_kills.stage3;
    const newStage = calculateBestiaryStage(newKills, monster.bestiary_kills);

    return runUpdate({ kills: newKills, stage: newStage });
  };

  const saveKills = (kills: number) => {
    const newStage = calculateBestiaryStage(kills, monster.bestiary_kills);
    return runUpdate({ kills, stage: newStage });
  };

  return {
    monster,
    isLoading,
    isBestiaryCompleted,
    toggleSoulpit,
    toggleFullBestiary,
    saveKills,
  };
}
