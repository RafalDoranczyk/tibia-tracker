"use client";

import { useState } from "react";
import { FloatingAIButton } from "@/components";
import { ScannerModal } from "./ScannerModal";

export function AIFloatingPanel() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = (
    _event: React.SyntheticEvent,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <FloatingAIButton onClick={handleOpen} label="Open AI Bestiary Scanner" />

      <ScannerModal open={open} onClose={handleClose} />
    </>
  );
}
