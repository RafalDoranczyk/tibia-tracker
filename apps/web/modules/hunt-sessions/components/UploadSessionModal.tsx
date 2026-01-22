"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { HuntSessionFormValues, HuntSessionLogParseResult, MonsterPreview } from "../types";
import { HuntSessionParseError, parseHuntSessionText } from "../utils/parseHuntSessionText";

type UploadSessionModalProps = {
  open: boolean;
  monsterList: MonsterPreview[];
  onClose: () => void;
};

export function UploadSessionModal({ open, monsterList, onClose }: UploadSessionModalProps) {
  const { setValue } = useFormContext<HuntSessionFormValues>();

  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setText("");
      setError(null);
    }
  }, [open]);

  const handleImport = (parsed: HuntSessionLogParseResult) => {
    if (parsed.xp_gain !== undefined) {
      setValue("xp_gain", parsed.xp_gain, { shouldDirty: true });
    }

    if (parsed.raw_xp_gain !== undefined) {
      setValue("raw_xp_gain", parsed.raw_xp_gain, { shouldDirty: true });
    }

    if (parsed.balance !== undefined) {
      setValue("balance", parsed.balance, { shouldDirty: true });
    }

    if (parsed.minutes !== undefined) {
      setValue("minutes", parsed.minutes, { shouldDirty: true });
    }

    if (parsed.date !== undefined) {
      setValue("date", parsed.date, { shouldDirty: true });
    }

    if (parsed.monsters) {
      const monsterMap = new Map(monsterList.map((m) => [m.name.toLowerCase(), m]));

      const monstersWithIds = parsed.monsters
        .flatMap((pm) => {
          const m = monsterMap.get(pm.name.toLowerCase());
          return m ? [{ id: m.id, name: m.name, count: pm.count, image_url: m.image_url }] : [];
        })
        .sort((a, b) => b.count - a.count);

      setValue(
        "monsters",
        monstersWithIds.map(({ image_url, ...m }) => m),
        { shouldDirty: true }
      );

      setValue(
        "damage_sources",
        monstersWithIds.map(({ id, name, image_url }) => ({
          id,
          percent: 0,
          damage_source: {
            id,
            name,
            image_url,
          },
        })),
        { shouldDirty: true }
      );
    }
  };

  const handleParseAndImport = () => {
    if (!text.trim()) return;

    try {
      const parsed = parseHuntSessionText(text);
      handleImport(parsed);
      onClose();
    } catch (err) {
      if (err instanceof HuntSessionParseError) {
        setError(`Missing or invalid fields:\n${err.missingFields.join(", ")}`);
      } else {
        setError("Could not parse session data. Invalid format.");
      }
    }
  };

  return (
    <Dialog disableRestoreFocus open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Upload Hunt Session JSON</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={10}
          placeholder="Paste Tibia session log here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={!!error}
          helperText={error || "Paste JSON log exported from Tibia folder."}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button variant="contained" onClick={handleParseAndImport} disabled={!text.trim()}>
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}
