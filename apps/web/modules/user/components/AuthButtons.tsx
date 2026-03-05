"use client";

import Discord from "@mui/icons-material/DiscFullRounded";
import { Button } from "@mui/material";
import { startOAuthLogin } from "@/modules/user/actions";

export function AuthButtons() {
  return (
    <Button
      onClick={() => startOAuthLogin("discord")}
      variant="outlined"
      startIcon={<Discord />}
      fullWidth
    >
      Continue with Discord
    </Button>
  );
}
