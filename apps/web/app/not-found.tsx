import ArrowBack from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import SearchOff from "@mui/icons-material/SearchOff";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box minHeight="100dvh" display="flex" alignItems="center" justifyContent="center">
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            {/* Icon */}
            <SearchOff color="disabled" sx={{ fontSize: 56 }} />

            {/* 404 */}
            <Typography variant="h2" color="primary">
              404
            </Typography>

            {/* Text */}
            <Stack spacing={1}>
              <Typography variant="h5">You are lost in Tibia</Typography>

              <Typography variant="body2" color="text.secondary">
                The page you are looking for could not be found.
              </Typography>
            </Stack>

            {/* Actions */}
            <Stack spacing={2} width="100%">
              <Button href="/" size="large" variant="contained" startIcon={<Home />} fullWidth>
                Return to Temple
              </Button>

              <Button
                href="javascript:history.back()"
                size="large"
                variant="outlined"
                startIcon={<ArrowBack />}
                fullWidth
              >
                Go Back
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
