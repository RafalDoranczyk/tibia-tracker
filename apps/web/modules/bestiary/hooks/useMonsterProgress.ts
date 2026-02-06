"use client";

import { useState } from "react";

import { useRequiredCharacterId } from "@/modules/characters";
import { useToast } from "@/providers/app";

import { UpdateCharacterBestiary } from "../actions/updateCharacterBestiary";
import { BESTIARY_FULL_STAGE } from "../constants";
import type { MonsterWithCharacterProgress } from "../schemas";
import { getBestiaryStage } from "../utils/getBestiaryStage";

export function useMonsterProgress(initialMonster: MonsterWithCharacterProgress) {
  const toast = useToast();
  const characterId = useRequiredCharacterId();

  const [monster, setMonster] = useState(initialMonster);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingKills, setIsEditingKills] = useState(false);
  const [editedKills, setEditedKills] = useState(monster.kills);

  const isBestiaryCompleted = monster.stage === BESTIARY_FULL_STAGE;

  const optimisticUpdate = async (updates: Partial<MonsterWithCharacterProgress>) => {
    const prev = monster;
    setMonster((m) => ({ ...m, ...updates }));

    try {
      await UpdateCharacterBestiary({
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
    try {
      await optimisticUpdate({ has_soul: !monster.has_soul });
      toast.success(`Soulpit for ${monster.name} saved`);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingKills = () => {
    setEditedKills(monster.kills);
    setIsEditingKills(true);
  };

  const toggleFullBestiary = async () => {
    setIsLoading(true);
    const newKills = monster.stage === BESTIARY_FULL_STAGE ? 0 : monster.bestiary_kills.stage3;
    const newStage = getBestiaryStage(newKills, monster.bestiary_kills);

    try {
      await optimisticUpdate({
        kills: newKills,
        stage: newStage,
      });
      toast.success(`Bestiary for ${monster.name} saved`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveKills = async () => {
    const { stage1, stage2, stage3 } = monster.bestiary_kills;

    const maxKills = stage3;
    const newKills = Math.max(0, Math.min(editedKills, maxKills));

    const newStage = getBestiaryStage(newKills, {
      stage1,
      stage2,
      stage3,
    });

    setIsEditingKills(false);

    await optimisticUpdate({
      kills: newKills,
      stage: newStage,
    });

    toast.success(`Kills for ${monster.name} saved`);
  };

  return {
    monster,
    isLoading,
    isBestiaryCompleted,

    // kills editing
    isEditingKills,
    editedKills,
    setEditedKills,
    startEditingKills,
    saveKills,

    // actions
    toggleSoulpit,
    toggleFullBestiary,
  };
}
