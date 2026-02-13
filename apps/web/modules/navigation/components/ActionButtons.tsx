import { Box } from "@mui/material";

import { TooltipIconButton } from "@/components";
import { logoutUser } from "@/modules/user/actions/logout-user";

import { CharacterSwitcher } from "./CharacterSwitcher";

export function ActionButtons() {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <CharacterSwitcher />
      <TooltipIconButton onClick={logoutUser} variant="logout" />
    </Box>
  );
}
