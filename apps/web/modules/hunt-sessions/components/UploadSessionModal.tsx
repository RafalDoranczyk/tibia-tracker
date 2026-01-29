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

import { monstersToDamageSources } from "../mappers/mapMonstersToDamageSources";
import { mapParsedEntitiesToCatalog } from "../mappers/mapParsedSessionToCatalog";
import { HuntSessionRawParsedSchema } from "../schemas";
import type {
  HuntSessionFormValues,
  HuntSessionUnknownEntities,
  ItemPreview,
  MonsterPreview,
} from "../types";
import { HuntSessionParseError, parseHuntSessionJSON } from "../utils/parseHuntSessionJSON";

function patchFormValues<T extends Record<string, any>>(
  values: T,
  setValue: (name: keyof T, value: T[keyof T]) => void
) {
  for (const key of Object.keys(values) as (keyof T)[]) {
    setValue(key, values[key]);
  }
}

type UploadSessionModalProps = {
  open: boolean;
  monsterList: MonsterPreview[];
  itemList: ItemPreview[];
  setUnknownEntities: (unknownEntities: HuntSessionUnknownEntities) => void;
  onClose: () => void;
};

export function UploadSessionModal({
  open,
  monsterList,
  itemList,
  setUnknownEntities,
  onClose,
}: UploadSessionModalProps) {
  const { setValue } = useFormContext<HuntSessionFormValues>();

  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setText("");
      setError(null);
    }
  }, [open]);

  const handleParseAndImport = () => {
    if (!text.trim()) return;

    if (text.length > 100_000) {
      setError("Log too large");
      return;
    }

    try {
      const parsed = parseHuntSessionJSON(text);
      const parsedPayload = HuntSessionRawParsedSchema.parse(parsed);
      const { monsters, items, ...rest } = parsedPayload;

      patchFormValues(rest, (name, value) => setValue(name, value));

      const { mapped: parsedMonsters, unknown: monstersUnknown } = mapParsedEntitiesToCatalog(
        parsed.monsters,
        monsterList
      );
      const { mapped: parsedItems, unknown: itemsUnknown } = mapParsedEntitiesToCatalog(
        parsed.items,
        itemList
      );
      const damageSources = monstersToDamageSources(parsedMonsters);

      setValue("monsters", parsedMonsters, { shouldDirty: true });
      setValue("items", parsedItems, { shouldDirty: true });
      setValue("damage_sources", damageSources, { shouldDirty: true });

      // Import report unknown entities
      setUnknownEntities({ monsters: monstersUnknown, items: itemsUnknown });
      onClose();
    } catch (err) {
      if (err instanceof HuntSessionParseError) {
        setError(`Missing fields: ${err.missingFields.join(", ")}`);
      } else {
        setError("Could not parse session data. Invalid format.");
      }
    }
  };

  return (
    <Dialog
      aria-labelledby="upload-session-title"
      disableRestoreFocus
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="upload-session-title">Upload Hunt Session Log</DialogTitle>
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
          helperText={error || "Paste JSON session log exported from Tibia."}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleParseAndImport} disabled={!text.trim()}>
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}
