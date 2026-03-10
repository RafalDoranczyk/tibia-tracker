"use client";

import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { loginAdmin } from "@/actions";
import Favicon from "../public/favicon.ico";

export default function AdminLogin() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={4}>
            {/* Header */}
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(123, 92, 245, 0.1)",
                  border: "1px solid",
                  borderColor: "primary.main",
                }}
              >
                <Image src={Favicon} alt="App Icon" width={32} height={32} />
              </Box>

              <Stack spacing={0.5} textAlign="center">
                <Typography variant="h5" fontWeight="700" letterSpacing="-0.5px">
                  ADMIN PANEL
                </Typography>
              </Stack>
            </Stack>

            <Button onClick={loginAdmin} variant="outlined" startIcon={<GoogleIcon />} fullWidth>
              Admin Login
            </Button>
            {/* Stopka */}
            <Typography variant="caption" textAlign="center" color="text.disabled">
              © {new Date().getFullYear()} Admin Dashboard
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
