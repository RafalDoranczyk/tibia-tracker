"use client";

import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { dayjs } from "@/lib/dayjs";
import type { AppCharacter } from "../schemas";

const TOOLTIP_TEXT = `Synchronizing fetches live data (level, residence, etc.) from Tibia.com via TibiaData API. 
To prevent spam, global refresh is available every 15 minutes. Data will also automatically refresh upon 1 hour.`;

type SettingsDialogProps = {
  character: AppCharacter | null;
  open: boolean;
  onClose: () => void;
  onDelete: (characterId: string) => void;

  isPending?: boolean;
};

export function SettingsDialog({
  character,
  open,
  onClose,
  onDelete,

  isPending = false,
}: SettingsDialogProps) {
  const [confirmName, setConfirmName] = useState("");

  useEffect(() => {
    if (open) setConfirmName("");
  }, [open]);

  if (!character) return null;

  const isDeleteDisabled = confirmName !== character.name || isPending;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography fontWeight={800}>Settings</Typography>
        <IconButton onClick={onClose} size="small" disabled={isPending}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="overline" color="text.disabled" fontWeight={700}>
              Character
            </Typography>
            <Typography variant="h5" fontWeight={900} color="primary.main">
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {character.vocation?.replace(/_/g, " ")} • Level {character.level ?? "???"}
            </Typography>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" fontWeight={700}>
                Data Synchronization
              </Typography>
              <Tooltip title={TOOLTIP_TEXT}>
                <InfoOutlinedIcon fontSize="small" sx={{ cursor: "help" }} />
              </Tooltip>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                  {character.synchronized_at
                    ? `Last Database Update: ${dayjs(character.synchronized_at).format("HH:mm:ss")}`
                    : "Never synchronized with API"}
                </Typography>

                {character._cachedAt && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "text.disabled", fontStyle: "italic" }}
                  >
                    Data freshness: {dayjs(character._cachedAt).format("HH:mm:ss")}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ opacity: 0.1 }} />

          <Box
            sx={{
              bgcolor: alpha("#ff1744", 0.05),
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha("#ff1744", 0.2),
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <DeleteForeverIcon color="error" fontSize="small" />
              <Typography variant="subtitle2" color="error" fontWeight={700}>
                Danger Zone
              </Typography>
            </Stack>

            <Typography variant="caption" display="block" color="text.secondary" mb={2}>
              To confirm deletion, please type <b>{character.name}</b> below:
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="Type character name..."
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              disabled={isPending}
              autoComplete="off"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(0,0,0,0.2)",
                },
              }}
            />

            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => onDelete(character.id)}
              disabled={isDeleteDisabled}
              sx={{
                fontWeight: 700,
                height: 40,
                "&.Mui-disabled": {
                  bgcolor: alpha("#ff1744", 0.1),
                  color: alpha("#fff", 0.3),
                },
              }}
            >
              {isPending ? <CircularProgress size={20} color="inherit" /> : "Remove Character"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
