"use client";

import { AppBar, Drawer, Toolbar } from "@mui/material";
import { useState } from "react";

import { TooltipIconButton } from "@/components";

import { NavigationLinks } from "./NavigationLinks";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.default",
        }}
      >
        <Toolbar>
          <TooltipIconButton aria-label="open menu" onClick={handleToggle} variant="menu" />
        </Toolbar>
      </AppBar>
      <Drawer onClose={handleClose} open={open} variant="temporary">
        <NavigationLinks />
      </Drawer>
    </>
  );
}
