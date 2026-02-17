import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { parseBestiaryAI } from "../../actions/parse-bestiary-ai";
import type { AIMonsterScan } from "../../schemas";

type UploadFilesCardProps = {
  setScannedMonsters: (monsters: AIMonsterScan[] | null) => void;
};

export function UploadFilesCard({ setScannedMonsters }: UploadFilesCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (PNG, JPG).");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await parseBestiaryAI(formData);

      if (result.success) {
        setScannedMonsters(result.data?.monsters ?? null);
      } else {
        setError(result.error ?? "AI could not process this image.");
      }
    } catch {
      setError("Connection to AI service failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <Paper
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      elevation={0}
      sx={{
        p: 6,
        border: "2px dashed",
        borderColor: loading ? "secondary.main" : isDragging ? "#4285F4" : "divider",
        bgcolor: isDragging ? "rgba(66, 133, 244, 0.04)" : "transparent",
        textAlign: "center",
        transition: "all 0.3s ease",
        borderRadius: 4,
      }}
    >
      <Stack spacing={3} alignItems="center">
        {loading ? (
          <Stack spacing={2} alignItems="center">
            <CircularProgress color="secondary" size={48} />
            <Typography variant="body2" color="text.secondary">
              Analyzing Bestiary screenshot...
            </Typography>
          </Stack>
        ) : (
          <>
            <CloudUploadIcon
              sx={{
                fontSize: 64,
                color: isDragging ? "#4285F4" : "text.disabled",
                transition: "color 0.2s",
              }}
            />

            <div>
              <Typography variant="h6" fontWeight="bold">
                {isDragging ? "Drop image now" : "Upload Screenshot"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Drag and drop your file here or use the button below
              </Typography>
            </div>

            <Button component="label" variant="contained" disabled={loading}>
              Choose File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              />
            </Button>
          </>
        )}

        {error && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
