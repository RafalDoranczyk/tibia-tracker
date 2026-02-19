"use client";

import CloseIcon from "@mui/icons-material/Close";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Backdrop, Box, Button, Fade, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { DamageElement } from "@/modules/damage-elements";
import type { AIHuntSessionScan, MonsterPreview } from "../../schemas";
import { AIScanPreviewCard } from "./AIScanPreviewCard";
import { UploadFilesCard } from "./UploadFilesCard";

const exampleScan: AIHuntSessionScan = {
  skills_window: {
    level: 150,
    xp: 123456789,
    armor: 200,
    defense: 150,
    mitigation: 75,
    skills: {
      magic_level: 80,
      sword: 90,
      axe: 85,
      club: 88,
      distance: 92,
    },
    resistances: {
      fire: 20,
      ice: 10,
      energy: null,
      earth: 5,
    },
  },
  hunt_analyser: {
    session: "2h 30m",
    raw_xp_gain: 123456789,
    xp_gain: 100000000,
    raw_xp_h: 49382745,
    xp_h: 40000000,
    loot: 5000000,
    supplies: 2000000,
    balance: 3000000,
    damage: 2500000,
    damage_h: 1000000,
    healing: 500000,
    healing_h: 200000,
    killed_monsters: [
      { name: "Demon", amount: 50 },
      { name: "Dragon", amount: 20 },
      { name: "Giant Spider", amount: 100 },
    ],
  },
};

type ScannerModalProps = {
  open: boolean;
  damageElementList: DamageElement[];
  monsterList: MonsterPreview[];
  onClose: () => void;
  onApply: (scan: AIHuntSessionScan) => void;
};

export function ScannerModal({
  open,
  damageElementList,
  monsterList,
  onClose,
  onApply,
}: ScannerModalProps) {
  const [scan, setScan] = useState<AIHuntSessionScan | null>(exampleScan);

  const handleClose = (
    _event: React.SyntheticEvent,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  const handleApply = () => {
    if (scan) {
      onApply(scan);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}>
      <Fade in={open}>
        <Box
          sx={{
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 600, md: 700 },
            bgcolor: "#0a0a0c",
            border: "1px solid rgba(124, 58, 237, 0.2)",
            boxShadow: "0 0 50px rgba(0,0,0,0.8), 0 0 20px rgba(124, 58, 237, 0.1)",
            p: 2,
            borderRadius: 4,
            outline: "none",
          }}
        >
          {/* Header */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="h4"
                fontWeight="900"
                sx={{
                  background: "linear-gradient(45deg, #a78bfa, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: -0.5,
                }}
              >
                AI Session Scanner
              </Typography>
            </Stack>
            <IconButton onClick={onClose} size="small" sx={{ color: "text.disabled" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {!scan && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3, bgcolor: "rgba(167, 139, 250, 0.05)", p: 2, borderRadius: 2 }}
            >
              <Typography maxWidth={500} variant="body2" color="text.secondary">
                Upload a screenshot of your Tibia hunt session summary to automatically extract
                details like monsters killed, loot collected, and skill progression.
              </Typography>
            </Stack>
          )}

          {/* Main Content Area */}
          <Box sx={{ overflowY: "auto", flex: 1, pr: 1 }}>
            {scan ? (
              <AIScanPreviewCard
                damageElementList={damageElementList}
                monsterList={monsterList}
                scan={scan}
                onClear={() => setScan(null)}
              />
            ) : (
              <UploadFilesCard setScan={setScan} />
            )}
          </Box>

          {/* Footer Actions */}
          {scan && (
            <Box
              sx={{
                pt: 2,
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button onClick={() => setScan(null)} color="inherit" sx={{ opacity: 0.6 }}>
                Scan Another
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SaveAltIcon />}
                onClick={handleApply}
              >
                Apply Data to Form
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
