import { alpha, Box, Typography } from "@mui/material";

export function Overlay() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(6px)",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
        Predictions Locked
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 240 }}>
        Please provide your current experience in settings to enable progression forecasting.
      </Typography>
    </Box>
  );
}
