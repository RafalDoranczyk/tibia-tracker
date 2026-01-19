"use client";

import { useState } from "react";

import type { Character } from "@/modules/characters";

import { NavigationLinks } from "../NavigationLinks";
import { MobileNavigationBar } from "./MobileNavigationBar";
import { MobileNavigationDrawer } from "./MobileNavigationDrawer";

type MobileNavigationProps = {
  characters?: Character[];
};

export function MobileNavigation({ characters }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MobileNavigationBar characters={characters} toggleOpen={handleToggle} />
      <MobileNavigationDrawer onClose={handleClose} open={open}>
        <NavigationLinks />
      </MobileNavigationDrawer>
    </>
  );
}
