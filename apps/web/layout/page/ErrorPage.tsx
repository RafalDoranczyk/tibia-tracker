"use client";

import BugReport from "@mui/icons-material/BugReport";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Home from "@mui/icons-material/Home";
import Lightbulb from "@mui/icons-material/Lightbulb";
import Refresh from "@mui/icons-material/Refresh";
import ReportProblemRounded from "@mui/icons-material/ReportProblemRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  description?: string;
  reset?: () => void;
  title: string;
  showDetails?: boolean;
  errorCode?: string;
  digest?: string;
  technicalDetails?: Record<string, unknown>;
  suggestions?: string[];
};

export function ErrorPage({
  description,
  reset,
  title,
  showDetails = false,
  errorCode,
  digest,
  technicalDetails,
  suggestions,
}: Props) {
  const handleReportBug = () => {
    console.log({ title, description, errorCode, digest, technicalDetails });
  };

  return (
    <Box minHeight="100dvh" display="flex" alignItems="center" justifyContent="center">
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <ReportProblemRounded color="error" sx={{ fontSize: 56 }} />

            {errorCode && <Chip label={errorCode} color="error" variant="outlined" />}

            <Typography variant="h4">{title}</Typography>

            {description && <Typography color="text.secondary">{description}</Typography>}

            {/* Actions */}
            <Stack spacing={2} width="100%">
              {reset && (
                <Button
                  onClick={reset}
                  size="large"
                  variant="contained"
                  startIcon={<Refresh />}
                  fullWidth
                >
                  Try Again
                </Button>
              )}

              <Button href="/" size="large" variant="outlined" startIcon={<Home />} fullWidth>
                Go Home
              </Button>

              <Button onClick={handleReportBug} startIcon={<BugReport />}>
                Report Bug
              </Button>
            </Stack>

            {/* Suggestions */}
            {(suggestions?.length ?? 0) > 0 && (
              <Box width="100%">
                <Divider sx={{ my: 2 }} />

                <Stack spacing={1.5} alignItems="flex-start">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Lightbulb color="primary" />
                    <Typography variant="subtitle1">Suggested solutions</Typography>
                  </Stack>

                  <List dense disablePadding>
                    {(suggestions ?? []).map((s) => (
                      <ListItem key={s} disableGutters>
                        <ListItemIcon>
                          <Lightbulb fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={s} />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Box>
            )}

            {/* Technical */}
            {showDetails && (technicalDetails || errorCode || digest) && (
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body2">Technical details</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Stack spacing={0.5} alignItems="flex-start">
                    {errorCode && (
                      <Typography variant="caption">Error Code: {errorCode}</Typography>
                    )}

                    {digest && <Typography variant="caption">Digest: {digest}</Typography>}

                    {technicalDetails &&
                      Object.entries(technicalDetails).map(([k, v]) => (
                        <Typography key={k} variant="caption">
                          {k}: {typeof v === "object" ? JSON.stringify(v) : String(v)}
                        </Typography>
                      ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}

            <Typography variant="caption" color="text.secondary">
              If the problem persists, contact support.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
