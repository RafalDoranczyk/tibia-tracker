"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { createCharacter } from "../actions/createCharacter";
import { updateCharacter } from "../actions/updateCharacter";
import { ALLOWED_VOCATIONS } from "../constants";
import { createCharacterSchema } from "../schemas";
import type { Character, CreateCharacterPayload } from "../types";

type CharacterModalProps = {
  open: boolean;
  onClose: () => void;
  character?: Character;
  onSuccess?: () => void;
};

export function CharacterModal({ open, onClose, character, onSuccess }: CharacterModalProps) {
  const isEdit = Boolean(character?.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CreateCharacterPayload>({
    resolver: zodResolver(createCharacterSchema),
    values: {
      name: character?.name || "",
      vocation: character?.vocation || ALLOWED_VOCATIONS[0],
      world: character?.world || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isEdit && character?.id) {
      await updateCharacter({ ...data, id: character.id });
    } else {
      await createCharacter(data);
    }

    reset();
    onClose();
    onSuccess?.();
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{isEdit ? "Edit character" : "Add new character"}</DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <Controller
              name="vocation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Vocation"
                  select
                  error={!!errors.vocation}
                  helperText={errors.vocation?.message}
                >
                  {ALLOWED_VOCATIONS.map((vocation) => (
                    <MenuItem key={vocation} value={vocation}>
                      {vocation}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextField
              label="World"
              {...register("world")}
              error={!!errors.world}
              helperText={errors.world?.message}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button loading={isSubmitting} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" loading={isSubmitting}>
            {isEdit ? "Save changes" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
