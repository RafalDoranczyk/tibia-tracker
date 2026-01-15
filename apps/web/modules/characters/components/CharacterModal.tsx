"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  addCharacter,
  type AddCharacterInput,
  AddCharacterSchema,
  ALLOWED_VOCATIONS,
} from "@/modules/characters";
import { useActiveCharacter } from "@/providers/feature/dashboard";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  existingCount?: number;
};

export function CharacterModal({ open, onClose, onSuccess }: Props) {
  const router = useRouter();
  const { setActiveCharacterId } = useActiveCharacter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddCharacterInput>({
    resolver: zodResolver(AddCharacterSchema),
  });

  const onSubmit = async (data: AddCharacterInput) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, String(value));
    }

    const res = await addCharacter(formData);
    if (res.success) {
      const newChar = res.data?.[0];
      if (newChar) setActiveCharacterId(newChar.id);

      reset();
      onClose();

      if (onSuccess) onSuccess();
      else router.refresh();
    } else {
      console.error(res);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add new character</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Vocation"
              select
              defaultValue={ALLOWED_VOCATIONS[0]}
              {...register("vocation")}
              error={!!errors.vocation}
              helperText={errors.vocation?.message}
            >
              {ALLOWED_VOCATIONS.map((vocation) => (
                <MenuItem key={vocation} value={vocation}>
                  {vocation}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="World"
              {...register("world")}
              error={!!errors.world}
              helperText={errors.world?.message}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={isSubmitting} onClick={onClose}>
            Cancel
          </LoadingButton>
          <LoadingButton loading={isSubmitting} type="submit" variant="contained">
            Add
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
