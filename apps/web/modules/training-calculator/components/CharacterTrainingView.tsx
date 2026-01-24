"use client";

import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import { OnlineTrainingView } from "./OnlineTrainingView";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function CharacterTrainingView() {
  const [value, setValue] = useState(0);

  return (
    <Grid sx={{ maxWidth: 1300 }}>
      <Tabs
        value={value}
        onChange={(_, newValue: number) => setValue(newValue)}
        aria-label="basic tabs example"
      >
        <Tab label="Online Training" {...a11yProps(0)} />
        <Tab label="Offline Training" {...a11yProps(1)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <OnlineTrainingView />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        Offline Training
      </CustomTabPanel>
    </Grid>
  );
}
