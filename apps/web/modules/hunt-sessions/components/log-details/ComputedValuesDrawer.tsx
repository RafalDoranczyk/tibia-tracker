import { Box, Drawer, Grid, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import type { HuntSessionForm } from "../../schemas";

type ComputedStatProps = {
  label: string;
  value: string | number;
};

function ComputedStat({ label, value }: ComputedStatProps) {
  return (
    <Grid size={{ xs: 4 }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            opacity: 0.6,
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 15,
            mt: 0.5,
          }}
        >
          {value}
        </Typography>
      </Box>
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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function ComputedValuesDrawer({ open, setOpen }: Props) {
  const { getValues } = useFormContext<HuntSessionForm>();

  const values = getValues();

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(15,15,25,0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography fontWeight={700}>Session Telemetry</Typography>
      </Box>

      {/* BODY */}
      <Box sx={{ p: 2 }}>
        {/* CORE */}
        <Typography mb={2} variant="body2">
          These values are computed from the uploaded log data and will be stored in the database.
        </Typography>

        <Section title="Core">
          <Grid container spacing={2}>
            <ComputedStat label="Started At" value={values.started_at} />
            <ComputedStat label="Ended At" value={values.ended_at} />
            <ComputedStat label="Duration (s)" value={values.duration_seconds} />
            <ComputedStat label="XP Gain" value={values.xp_gain} />
            <ComputedStat label="Raw XP Gain" value={values.raw_xp_gain} />
            <ComputedStat label="Date" value={values.date} />
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
      </Box>
    </Drawer>
  );
}
