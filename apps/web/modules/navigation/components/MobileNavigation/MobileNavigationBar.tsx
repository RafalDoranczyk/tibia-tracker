import { AppBar, Box, Toolbar } from "@mui/material";

import type { Character } from "@/modules/characters";

import { NavigationActionButtons } from "../NavigationActionButtons";
import MobileDrawerToggler from "./MobileDrawerToggler";

type MobileNavigationBarProps = {
  toggleOpen: () => void;
  characters?: Character[];
};

export function MobileNavigationBar({ toggleOpen, characters }: MobileNavigationBarProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Toolbar>
        <MobileDrawerToggler toggleOpen={toggleOpen} />
        <Box ml="auto" />
        <NavigationActionButtons characters={characters} />
      </Toolbar>
    </AppBar>
  );
}
