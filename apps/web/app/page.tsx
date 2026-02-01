import Gamepad from "@mui/icons-material/Gamepad";
import GitHub from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";

import { appConfig } from "@/config";
import { loginWithGithub, loginWithGoogle } from "@/modules/user";

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

            {/* Auth */}
            <Stack spacing={2} width="100%">
              <Button
                onClick={loginWithGoogle}
                size="large"
                variant="contained"
                startIcon={<Google />}
                fullWidth
              >
                Continue with Google
              </Button>

              <Divider>OR</Divider>

              <Button
                onClick={loginWithGithub}
                size="large"
                variant="outlined"
                startIcon={<GitHub />}
                fullWidth
              >
                Continue with GitHub
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
