"use client";

import { Button } from "@mui/material";
import { useState, useTransition } from "react";

import { ConfirmDialog, EmptyState } from "@/components";

import { deleteCharacter } from "../actions";
import { useActiveCharacter } from "../providers/ActiveCharacterProvider";
import type { Character } from "../schemas";
import { CharacterModal } from "./CharacterModal";
import { CharactersGrid } from "./CharactersGrid";

type CharactersViewProps = {
  characters: Character[];
  hasCharacters: boolean;
};

export function CharactersView({ hasCharacters, characters }: CharactersViewProps) {
  const { activeCharacterId, setActiveCharacterId } = useActiveCharacter();

  // -----------------------------
  // UI State
  // -----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characterToEdit, setCharacterToEdit] = useState<Character | null>(null);
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);
  const [isPending, startTransition] = useTransition();

  // -----------------------------
  // Handlers
  // -----------------------------
  const onSelect = (character: Character) => {
    setActiveCharacterId(character.id);
  };

  // open confirm dialog
  const onDelete = (character: Character) => {
    setCharacterToDelete(character);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCharacterToEdit(null);
  };

  const onEdit = (character: Character) => {
    setIsModalOpen(true);
    setCharacterToEdit(character);
  };

  const handleConfirmDelete = () => {
    if (!characterToDelete) return;

    startTransition(async () => {
      await deleteCharacter(characterToDelete.id);

      // if deleted active character → reset
      if (activeCharacterId === characterToDelete.id) {
        setActiveCharacterId(null);
      }

      setCharacterToDelete(null);
    });
  };

  return (
    <>
      {!hasCharacters ? (
        <EmptyState
          variant="character"
          action={
            <Button
              variant="contained"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Create character
            </Button>
          }
          title="No characters yet"
          subtitle="Start by creating your first character to unlock character-specific features."
        />
      ) : (
        <CharactersGrid
          onCreate={() => setIsModalOpen(true)}
          onEdit={onEdit}
          characters={characters}
          onDelete={onDelete}
          onSelect={onSelect}
          activeCharacterId={activeCharacterId}
        />
      )}

      <CharacterModal
        open={isModalOpen}
        character={characterToEdit ?? undefined}
        onClose={handleCloseModal}
        onSuccess={() => {
          handleCloseModal();
        }}
      />

      <ConfirmDialog.Root
        open={Boolean(characterToDelete)}
        onOpenChange={(open) => !open && setCharacterToDelete(null)}
      >
        <ConfirmDialog.Header
          title="Delete character"
          description={
            characterToDelete
              ? `Are you sure you want to delete ${characterToDelete.name}? This action cannot be undone.`
              : ""
          }
        />

        <ConfirmDialog.Actions>
          <ConfirmDialog.Cancel loading={isPending} />
          <ConfirmDialog.Confirm loading={isPending} color="error" onClick={handleConfirmDelete}>
            Delete
          </ConfirmDialog.Confirm>
        </ConfirmDialog.Actions>
      </ConfirmDialog.Root>
    </>
  );
}
