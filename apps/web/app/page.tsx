import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { appConfig } from "@/config";
import { AuthButtons } from "@/modules/user";
import Favicon from "../public/favicon.ico";

export default function Home() {
  return (
    <Box minHeight="100dvh" display="flex" alignItems="center" justifyContent="center">
      <Container maxWidth="xs">
        <Paper sx={{ p: 4 }}>
          <Stack spacing={4} alignItems="center">
            {/* Header */}
            <Stack spacing={2} alignItems="center">
              <Image src={Favicon} alt="App Icon" width={32} height={32} />

              <Stack spacing={0.5} textAlign="center">
                <Typography variant="h6">{appConfig.name}</Typography>
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
