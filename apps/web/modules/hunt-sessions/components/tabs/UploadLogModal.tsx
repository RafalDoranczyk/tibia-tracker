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

type UploadLogModalProps = {
  open: boolean;
  onClose: () => void;
  /** Function that parses the text. Returns an error (string) or null if successful */
  onImport: (text: string) => string | null;
  title?: string;
  placeholder?: string;
  helperText?: string;
  maxLength?: number;
};

export function UploadLogModal({
  open,
  onClose,
  onImport,
  title = "Import Data",
  placeholder = "Paste data here...",
  helperText = "Paste the raw log to begin importing.",
  maxLength = 200_000,
}: UploadLogModalProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setText("");
      setError(null);
    }
  }, [open]);

  const handleImport = () => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    if (trimmedText.length > maxLength) {
      setError(`Data is too large (${Math.round(trimmedText.length / 1024)} KB)`);
      return;
    }

    // Execute the logic provided from outside
    const resultError = onImport(trimmedText);

    if (resultError) {
      setError(resultError);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableRestoreFocus>
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={10}
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          error={!!error}
          helperText={error || helperText}
          sx={{
            "& .MuiInputBase-root": {
              fontFamily: "monospace",
              fontSize: "0.875rem",
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!text.trim()}
          color="secondary"
          sx={{ fontWeight: 700 }}
        >
          Import & Parse
        </Button>
      </DialogActions>
    </Dialog>
  );
}
