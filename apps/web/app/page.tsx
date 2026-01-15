import Gamepad from "@mui/icons-material/Gamepad";
import GitHub from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";

import { loginWithGithub, loginWithGoogle } from "@/actions/auth";
import { APP_NAME } from "@/constants";

export default function Home() {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center" py={4}>
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 6,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          {/* Header */}
          <Stack spacing={3} alignItems="center" mb={4}>
            <Box
              width={88}
              height={88}
              borderRadius="50%"
              bgcolor="primary.main"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow={6}
            >
              <Gamepad sx={{ fontSize: 44, color: "primary.contrastText" }} />
            </Box>

            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h3" fontWeight={800}>
                {APP_NAME}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to continue
              </Typography>
            </Stack>
          </Stack>

          {/* Auth buttons */}
          <Stack spacing={2}>
            <Button
              onClick={loginWithGoogle}
              size="large"
              variant="contained"
              startIcon={<Google />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              Continue with Google
            </Button>

            <Divider sx={{ my: 1 }}>OR</Divider>

            <Button
              onClick={loginWithGithub}
              size="large"
              variant="outlined"
              startIcon={<GitHub />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              Continue with GitHub
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
