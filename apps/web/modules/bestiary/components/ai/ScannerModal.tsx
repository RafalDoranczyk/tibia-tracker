"use client";

import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Backdrop, Box, Fade, IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import type { AIMonsterScan } from "../../schemas";
import { MonsterScanCardGrid } from "./MonsterScanCardGrid";
import { UploadFilesCard } from "./UploadFilesCard";

type ScannerModalProps = {
  open: boolean;
  onClose: (event: React.SyntheticEvent, reason?: "backdropClick" | "escapeKeyDown") => void;
};

export function ScannerModal({ open, onClose }: ScannerModalProps) {
  const [scannedMonsters, setScannedMonsters] = useState<AIMonsterScan[] | null>(null);

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }}>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "background.paper",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            p: 4,
            borderRadius: 4,
            outline: "none",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #4285F4, #9B72CB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Bestiary Scanner
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Upload a screenshot from your Tibia Cyclopedia to sync progress.
            </Typography>

            <Tooltip
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    How to get the best results:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                    <li>Open Cyclopedia &gt; Bestiary</li>
                    <li>
                      Make a screenshot of the Bestiary Class that you want to scan (e.g.,
                      "Aquatic")
                    </li>
                    <li>Soulpit icons are automatically detected</li>
                  </ul>
                </Box>
              }
              placement="top"
            >
              <InfoOutlinedIcon fontSize="small" sx={{ cursor: "help" }} />
            </Tooltip>
          </Stack>

          {scannedMonsters ? (
            <MonsterScanCardGrid
              scannedMonsters={scannedMonsters}
              setScannedMonsters={setScannedMonsters}
            />
          ) : (
            <UploadFilesCard setScannedMonsters={setScannedMonsters} />
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
