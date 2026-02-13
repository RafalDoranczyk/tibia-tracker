import Gamepad from "@mui/icons-material/Gamepad";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import { appConfig } from "@/config";
import { AuthButtons } from "@/modules/user";

export default function Home() {
  return (
    <Box minHeight="100dvh" display="flex" alignItems="center" justifyContent="center">
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={4} alignItems="center">
            {/* Header */}
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Gamepad color="inherit" />
              </Box>

              <Stack spacing={0.5} textAlign="center">
                <Typography variant="h4">{appConfig.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to continue
                </Typography>
              </Stack>
            </Stack>

            <AuthButtons />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
