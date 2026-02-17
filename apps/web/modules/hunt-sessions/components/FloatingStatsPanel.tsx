"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CloseIcon from "@mui/icons-material/Close";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShieldIcon from "@mui/icons-material/Shield";

import {
  Alert,
  alpha,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { type ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FloatingStatsButton } from "@/components";
import { formatDateTime } from "@/utils";
import type { HuntSessionForm } from "../schemas";
import { parseSecondsToMinutes } from "../utils/parseSecondsToMinutes";

type ComputedStatProps = {
  label: string;
  value: string | number;
  color?: string;
};

function ComputedStat({ label, value, color }: ComputedStatProps) {
  return (
    <Grid size={{ xs: 6 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={700} sx={{ color: color || "text.primary" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </Typography>
    </Grid>
  );
}

type SectionProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

function Section({ title, icon, children }: SectionProps) {
  return (
    <Box mb={4}>
      <Divider
        textAlign="left"
        sx={{ mb: 2, "&::before, &::after": { borderColor: "rgba(255,255,255,0.1)" } }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1 }}>
          {icon}
          <Typography
            variant="overline"
            sx={{
              opacity: 0.8,
              fontWeight: 900,
              letterSpacing: "0.1em",
              color: "secondary.light",
            }}
          >
            {title}
          </Typography>
        </Stack>
      </Divider>
      <Box sx={{ px: 1 }}>{children}</Box>
    </Box>
  );
}

export function FloatingStatsPanel() {
  const [open, setOpen] = useState(false);
  const { getValues } = useFormContext<HuntSessionForm>();
  const values = getValues();

  if (!(values && values.healing > 0)) return null;

  return (
    <>
      <FloatingStatsButton onClick={() => setOpen(true)} />

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100%", sm: 400 },
              p: 3,
              bgcolor: "background.paper",
              backgroundImage: "none",
            },
          },
        }}
      >
        {/* HEADER */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Box
              sx={{
                bgcolor: "secondary.main",
                p: 1,
                borderRadius: 2,
                display: "flex",
                boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.secondary.main, 0.4)}`,
              }}
            >
              <AssessmentIcon sx={{ color: "white" }} />
            </Box>
            <Typography variant="h6" fontWeight={800}>
              Session Stats
            </Typography>
          </Stack>
          <IconButton onClick={() => setOpen(false)} sx={{ bgcolor: "rgba(255,255,255,0.05)" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Alert severity="info" variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
          Data computed from analyzed hunt logs.
        </Alert>

        {/* CORE */}
        <Section title="Time & XP" icon={<AccessTimeIcon sx={{ fontSize: 16, opacity: 0.6 }} />}>
          <Grid container spacing={3}>
            <ComputedStat
              label="Duration"
              value={`${parseSecondsToMinutes(values.duration_seconds)} min`}
            />
            <ComputedStat label="XP Gain" value={values.xp_gain} color="info.light" />
            <ComputedStat label="Raw XP" value={values.raw_xp_gain} />
            <ComputedStat label="Started At" value={formatDateTime(values.started_at)} />
          </Grid>
        </Section>

        {/* ECONOMY */}
        <Section title="Economy" icon={<PaymentsIcon sx={{ fontSize: 16, opacity: 0.6 }} />}>
          <Box
            sx={{
              p: 2,
              bgcolor: alpha("#fff", 0.03),
              borderRadius: 2,
              mb: 3,
              border: "1px solid",
              borderColor: alpha("#fff", 0.05),
            }}
          >
            <ComputedStat
              label="Balance (Profit/Loss)"
              value={`${values.profit.toLocaleString()} gp`}
              color={values.profit >= 0 ? "success.main" : "error.main"}
            />
          </Box>
          <Grid container spacing={3}>
            <ComputedStat label="Loot Value" value={`${values.loot_value.toLocaleString()} gp`} />
            <ComputedStat
              label="Supplies"
              value={`${values.supplies_cost.toLocaleString()} gp`}
              color="error.light"
            />
          </Grid>
        </Section>

        {/* COMBAT */}
        <Section title="Combat" icon={<ShieldIcon sx={{ fontSize: 16, opacity: 0.6 }} />}>
          <Grid container spacing={3}>
            <ComputedStat label="Total Damage" value={values.damage} color="warning.light" />
            <ComputedStat label="Total Healing" value={values.healing} color="success.light" />
          </Grid>
        </Section>
      </Drawer>
    </>
  );
}
