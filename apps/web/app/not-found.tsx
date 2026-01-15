import ArrowBack from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import SearchOff from "@mui/icons-material/SearchOff";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      minHeight="100vh"
      bgcolor="grey.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Lost in Tibia Icon */}
          <Box
            width={120}
            height={120}
            borderRadius="50%"
            bgcolor="grey.800"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={2}
            borderColor="grey.700"
          >
            <SearchOff
              sx={{
                fontSize: 60,
                color: "grey.500",
              }}
            />
          </Box>

          {/* 404 Number */}
          <Typography
            variant="h1"
            fontWeight={800}
            color="primary.main"
            sx={{
              fontSize: { xs: 80, sm: 120 },
              lineHeight: 0.8,
              letterSpacing: "-0.02em",
            }}
          >
            404
          </Typography>

          {/* Error Messages */}
          <Stack spacing={2} maxWidth={400}>
            <Typography variant="h4" fontWeight={600} color="text.primary">
              You are lost in Tibia
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                fontSize: "1.1rem",
              }}
            >
              The page you are looking for could not be found. Maybe you stepped into the wrong
              portal or got trapped in a dead-end cave. Let’s send you back to a safe town temple!
            </Typography>
          </Stack>

          {/* Action Buttons */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3}>
            <Button
              href="/"
              size="large"
              variant="contained"
              color="primary"
              startIcon={<Home />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Return to Temple
            </Button>

            {/* Server Component friendly back button */}
            <Button
              href="javascript:history.back()"
              size="large"
              variant="outlined"
              color="inherit"
              startIcon={<ArrowBack />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                color: "grey.400",
                borderColor: "grey.600",
                "&:hover": {
                  borderColor: "grey.500",
                  backgroundColor: "grey.800",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Go Back
            </Button>
          </Stack>

          {/* Help Text */}
          <Typography
            variant="caption"
            color="text.disabled"
            mt={2}
            sx={{
              opacity: 0.7,
            }}
          >
            Hint: check the minimap or head back to the depot in Thais.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
