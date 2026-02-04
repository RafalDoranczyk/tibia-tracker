import AssessmentIcon from "@mui/icons-material/Assessment";
import { Box, Drawer, Grid, Typography } from "@mui/material";
import { type ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FloatingStatsButton } from "@/components";
import { formatDateTime } from "@/utils";

import type { HuntSessionForm } from "../schemas";
import { secondsToMinutes } from "../utils/parseSecondsToMinutes";

type ComputedStatProps = {
  label: string;
  value: string | number;
};

function ComputedStat({ label, value }: ComputedStatProps) {
  return (
    <Grid size={{ xs: 6 }}>
      <Typography variant="subtitle2">{label}</Typography>
      <Typography color="textSecondary" variant="caption">
        {value}
      </Typography>
    </Grid>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <Box mb={2}>
      <Typography
        variant="caption"
        sx={{
          opacity: 0.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
      <Box mt={1}>{children}</Box>
    </Box>
  );
}

export function FloatingStatsPanel() {
  const [open, setOpen] = useState(false);
  const { getValues } = useFormContext<HuntSessionForm>();

  const values = getValues();

  const healing = values.healing ?? 0;

  return (
    <>
      {healing > 0 && <FloatingStatsButton onClick={() => setOpen(true)} />}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {/* HEADER */}

        <Typography
          sx={{ mb: 2 }}
          variant="h6"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <AssessmentIcon fontSize="small" />
          Session Overview
        </Typography>

        {/* CORE */}
        <Typography mb={2} variant="body2">
          These values are computed from the uploaded log data and will be stored in the database.
        </Typography>

        <Section title="Core">
          <Grid container spacing={2}>
            <ComputedStat label="Date" value={values.date} />
            <ComputedStat label="Started At" value={formatDateTime(values.started_at)} />
            <ComputedStat label="Ended At" value={formatDateTime(values.ended_at)} />
            <ComputedStat
              label="Duration (min)"
              value={secondsToMinutes(values.duration_seconds)}
            />
            <ComputedStat label="XP Gain" value={values.xp_gain} />
            <ComputedStat label="Raw XP Gain" value={values.raw_xp_gain} />
          </Grid>
        </Section>

        {/* ECONOMY */}
        <Section title="Economy">
          <Grid container spacing={2}>
            <ComputedStat label="Profit" value={values.profit} />
            <ComputedStat label="Loot Value" value={values.loot_value} />
            <ComputedStat label="Supplies Cost" value={values.supplies_cost} />
          </Grid>
        </Section>

        {/* COMBAT */}
        <Section title="Combat">
          <Grid container spacing={2}>
            <ComputedStat label="Damage" value={values.damage} />
            <ComputedStat label="Healing" value={values.healing} />
          </Grid>
        </Section>
      </Drawer>
    </>
  );
}
