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
import type { ItemPreview } from "@/modules/items";
import { mapHuntSessionJSONToForm } from "../../../mappers/mapHuntSessionJSONToForm";
import { HuntSessionParseError } from "../../../parsers/parseHuntSessionJSON";
import type { HuntSessionForm, MonsterPreview } from "../../../schemas";

function patchFormValues<T extends Record<string, unknown>>(
  values: T,
  setValue: (name: keyof T, value: T[keyof T]) => void
) {
  for (const key of Object.keys(values) as (keyof T)[]) {
    setValue(key, values[key]);
  }
}

type UploadLogModalProps = {
  open: boolean;
  monsterList: MonsterPreview[];
  itemList: ItemPreview[];
  onClose: () => void;
};

export function UploadLogModal({ open, monsterList, itemList, onClose }: UploadLogModalProps) {
  const { setValue } = useFormContext<HuntSessionForm>();

  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setText("");
      setError(null);
    }
  }, [open]);

  const handleImport = () => {
    if (!text.trim()) return;

    if (text.length > 100_000) {
      setError("Log too large");
      return;
    }

    try {
      const { formValues } = mapHuntSessionJSONToForm({
        json: text,
        monsterList,
        itemList,
      });

      patchFormValues(formValues, (name, value) => setValue(name, value, { shouldDirty: true }));

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableRestoreFocus>
      <DialogTitle>Upload Hunt Session Log</DialogTitle>

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
        <Button variant="contained" onClick={handleImport} disabled={!text.trim()}>
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}
