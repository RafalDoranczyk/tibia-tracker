"use client";

import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ConfirmDialog } from "@/components";
import { type Character, CharacterModal, deleteCharacter } from "@/modules/characters";
import { useActiveCharacter } from "@/providers/feature/dashboard";

type CharacterSwitcherProps = {
  characters: Character[];
  activeCharacterId?: string;
  onSelect?: (characterId: string) => void;
};

export function CharacterSwitcher({
  characters,
  activeCharacterId,
  onSelect,
}: CharacterSwitcherProps) {
  const router = useRouter();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Character | null>(null);

  const { setActiveCharacterId } = useActiveCharacter();

  const active = characters.find((c) => c.id === activeCharacterId);
  const noCharacters = characters.length === 0;

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
  const handleCloseMenu = () => setMenuAnchor(null);

  const handleOpenAddModal = () => {
    handleCloseMenu();
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    await deleteCharacter(deleteTarget.id);
    setActiveCharacterId(null);
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => setDeleteTarget(null);

  if (noCharacters) {
    return (
      <>
        <Button
          size="small"
          variant="outlined"
          onClick={handleOpenAddModal}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderColor: "divider",
            minWidth: 160,
          }}
        >
          <Add /> Add your first character
        </Button>

        <CharacterModal open={isAddModalOpen} onClose={handleCloseAddModal} />
      </>
    );
  }

  return (
    <Box>
      <Button
        size="small"
        onClick={handleOpenMenu}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: 120,
        }}
      >
        {active ? (
          <>
            <Typography color="text.primary">{active.name}</Typography>
            {active.level && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                Lv {active.level}
              </Typography>
            )}
          </>
        ) : (
          "Select character"
        )}
      </Button>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        MenuListProps={{ dense: true }}
        PaperProps={{
          sx: {
            minWidth: 220,
            py: 0.5,
            bgcolor: "background.paper",
            boxShadow: 4,
            borderRadius: 2,
          },
        }}
      >
        {characters.map((char) => (
          <MenuItem
            key={char.id}
            selected={char.id === activeCharacterId}
            onClick={() => {
              handleCloseMenu();
              onSelect?.(char.id);
              router.refresh();
            }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 1,
              mx: 0.5,
              mb: 0.25,
              "&.Mui-selected": {
                bgcolor: "action.selected",
              },
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Box display="flex" flexDirection="column" gap={0.25}>
              <Typography fontWeight={600}>{char.name}</Typography>
              {char.world && (
                <Typography variant="caption" color="text.secondary">
                  {char.vocation} • {char.world}
                </Typography>
              )}
            </Box>

            {char.level && (
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
                sx={{ whiteSpace: "nowrap" }}
              >
                Lv {char.level}
              </Typography>
            )}
          </MenuItem>
        ))}

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            my: 0.5,
          }}
        />

        <MenuItem
          onClick={handleOpenAddModal}
          sx={{
            gap: 1,
          }}
        >
          <Add fontSize="small" color="primary" />
          Add new character
        </MenuItem>

        {active && (
          <MenuItem
            sx={{
              gap: 1,
            }}
            onClick={() => {
              handleCloseMenu();
              setDeleteTarget(active);
            }}
          >
            <Delete fontSize="small" color="error" />
            Delete {active.name}
          </MenuItem>
        )}
      </Menu>

      <CharacterModal open={isAddModalOpen} onClose={handleCloseAddModal} />

      <ConfirmDialog.Root
        open={!!deleteTarget}
        onOpenChange={(open) => !open && handleCancelDelete()}
      >
        <ConfirmDialog.Header
          title="Delete character"
          description={
            deleteTarget
              ? `Are you sure you want to delete ${deleteTarget.name}? This action cannot be undone.`
              : undefined
          }
        />

        <ConfirmDialog.Actions>
          <Button variant="outlined" color="inherit" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </ConfirmDialog.Actions>
      </ConfirmDialog.Root>
    </Box>
  );
}
