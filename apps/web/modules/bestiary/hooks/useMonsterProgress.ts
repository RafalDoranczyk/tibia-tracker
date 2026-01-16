"use client";

import { useState } from "react";

import { useRequiredCharacterId } from "@/providers/feature/dashboard";

import { updateCharacterBestiaryEntry } from "../actions/updateCharacterBestiary";
import type { MonsterWithCharacterProgress } from "../types";

const BESTIARY_EMPTY_STAGE = 0;
const BESTIARY_FULL_STAGE = 3;

export function useMonsterProgress(initialMonster: MonsterWithCharacterProgress) {
  const characterId = useRequiredCharacterId();

  const [monster, setMonster] = useState(initialMonster);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingKills, setIsEditingKills] = useState(false);
  const [editedKills, setEditedKills] = useState(initialMonster.kills);

  const isBestiaryUnlocked = monster.stage === BESTIARY_FULL_STAGE;

  const optimisticUpdate = async (updates: Partial<MonsterWithCharacterProgress>) => {
    const prev = monster;
    setMonster((m) => ({ ...m, ...updates }));

    try {
      await updateCharacterBestiaryEntry({
        characterId,
        monsterId: monster.id,
        updates,
      });
    } catch {
      setMonster(prev);
    }
  };

  const toggleSoulpit = async () => {
    setIsLoading(true);
    await optimisticUpdate({ has_soul: !monster.has_soul });
    setIsLoading(false);
  };

  const toggleFullBestiary = async () => {
    setIsLoading(true);

    const isNowFull = monster.stage !== BESTIARY_FULL_STAGE;
    const newStage = isNowFull ? BESTIARY_FULL_STAGE : BESTIARY_EMPTY_STAGE;
    const newKills = isNowFull ? monster.bestiary_kills.stage3 : 0;

    await optimisticUpdate({
      stage: newStage,
      kills: newKills,
    });

    setIsLoading(false);
  };

  const saveKills = async () => {
    const maxKills = monster.bestiary_kills.stage3;
    const newKills = Math.max(0, Math.min(editedKills, maxKills));
    const newStage = newKills >= maxKills ? BESTIARY_FULL_STAGE : monster.stage;

    setIsEditingKills(false);
    await optimisticUpdate({
      kills: newKills,
      stage: newStage,
    });
  };

  return {
    monster,
    isLoading,
    isBestiaryUnlocked,

    // kills editing
    isEditingKills,
    editedKills,
    setEditedKills,
    startEditingKills: () => setIsEditingKills(true),
    saveKills,

    // actions
    toggleSoulpit,
    toggleFullBestiary,
  };
}
