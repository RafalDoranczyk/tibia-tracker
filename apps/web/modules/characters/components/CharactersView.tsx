"use client";

import { useState, useTransition } from "react";

import { useToast } from "@/hooks";
import { deleteCharacter } from "../actions/delete-character";

import { useActiveCharacter } from "../providers/ActiveCharacterProvider";
import type { AppCharacter } from "../schemas";
import { CardGrid } from "./CardGrid";
import { SettingsDialog } from "./SettingsDialog";

type CharactersViewProps = {
  characters: AppCharacter[];
};

export function CharactersView({ characters }: CharactersViewProps) {
  const toast = useToast();
  const { activeCharacter, setActiveCharacterId } = useActiveCharacter();
  const [isPending, startTransition] = useTransition();

  // UI State

  const [settingsChar, setSettingsChar] = useState<AppCharacter | null>(null);

  // -----------------------------
  // Handlers
  // -----------------------------

  const onSelect = async (character: AppCharacter) => {
    await setActiveCharacterId(character.id);
    toast.success(`Active character set to ${character.name}`);
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteCharacter(id);

        if (activeCharacter?.id === id) {
          setActiveCharacterId(null);
        }

        toast.success("Character removed successfully");
        setSettingsChar(null);
      } catch {
        toast.error("Failed to remove character");
      }
    });
  };

  return (
    <>
      <CardGrid
        characters={characters}
        activeCharacterId={activeCharacter?.id ?? null}
        onSelect={onSelect}
        onSettings={setSettingsChar}
      />

      <SettingsDialog
        character={settingsChar}
        open={!!settingsChar}
        isPending={isPending}
        onClose={() => setSettingsChar(null)}
        onDelete={handleDelete}
      />
    </>
  );
}
