import { Box } from "@mui/material";

import { TooltipIconButton } from "@/components";
import { logout } from "@/modules/user";

import { CharacterSwitcher } from "./CharacterSwitcher";

export function ActionButtons() {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <CharacterSwitcher />
      <TooltipIconButton onClick={logout} variant="logout" />
    </Box>
  );
}
