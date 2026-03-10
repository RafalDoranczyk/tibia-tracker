import ArrowBack from "@mui/icons-material/ArrowBack";
import Dashboard from "@mui/icons-material/Dashboard";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { PATHS } from "@/core/paths";

export default function AdminNotFound() {
  return (
    <Box
      minHeight="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: "background.default" }}
    >
      <Container maxWidth="xs">
        <Paper sx={{ p: 5, textAlign: "center" }}>
          <Stack spacing={3} alignItems="center">
            {/* Icon */}
            <ErrorOutline color="primary" sx={{ fontSize: 64, opacity: 0.8 }} />

            {/* Title & Code */}
            <Stack spacing={0.5}>
              <Typography variant="h2" fontWeight="800" color="primary">
                404
              </Typography>
              <Typography variant="h5" fontWeight="600">
                Resource Not Found
              </Typography>
            </Stack>

            {/* Description */}
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              The requested data or endpoint does not exist in the administration system.
            </Typography>

            {/* Actions */}
            <Stack spacing={2} width="100%" sx={{ pt: 2 }}>
              <Button
                href={PATHS.DASHBOARD}
                size="large"
                variant="contained"
                startIcon={<Dashboard />}
                fullWidth
              >
                Dashboard
              </Button>

              <Button
                onClick={() => window.history.back()}
                size="large"
                variant="outlined"
                startIcon={<ArrowBack />}
                fullWidth
              >
                Back to previous
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
