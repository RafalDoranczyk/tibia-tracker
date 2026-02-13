"use client";

import GitHub from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
import { Button, Divider, Stack } from "@mui/material";

import { startOAuthLogin } from "@/modules/user";

export function AuthButtons() {
  return (
    <Stack spacing={2} width="100%">
      <Button
        onClick={() => startOAuthLogin("google")}
        size="large"
        variant="contained"
        startIcon={<Google />}
        fullWidth
      >
        Continue with Google
      </Button>

      <Divider>OR</Divider>

      <Button
        onClick={() => startOAuthLogin("github")}
        size="large"
        variant="outlined"
        startIcon={<GitHub />}
        fullWidth
      >
        Continue with GitHub
      </Button>
    </Stack>
  );
}
