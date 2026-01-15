import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { type HuntSessionParseResult, parseHuntSessionText } from "../utils/parseHuntSessionText";

type UploadSessionModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (data: HuntSessionParseResult) => void;
};

export function UploadSessionModal({ onImport, onClose, open }: UploadSessionModalProps) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleParse = (text: string) => {
    if (!text.trim()) return;
    try {
      const parsed = parseHuntSessionText(text);

      onImport(parsed);
      setError(null);
      onClose();
    } catch {
      setError("Could not parse session data. Check formatting.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Upload session json</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          fullWidth
          multiline
          rows={10}
          placeholder="Paste Tibia session log here..."
          onChange={(e) => handleParse(e.target.value)}
          error={!!error}
          helperText={error || "Paste to autofill fields"}
        />
      </DialogContent>
    </Dialog>
  );
}
