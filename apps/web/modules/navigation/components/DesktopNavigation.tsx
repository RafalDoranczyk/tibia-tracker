"use client";

import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";

import { appConfig } from "@/config";
import { useUser } from "@/modules/user";

import { APP_BAR_HEIGHT, DESKTOP_APP_NAVIGATION_DRAWER_WIDTH } from "..";
import { ActionButtons } from "./ActionButtons";
import { NavigationLinks } from "./NavigationLinks";

export function DesktopNavigation() {
  const user = useUser();

  const email = user?.email || "Unknown user";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: "none",
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          boxShadow: 0,
          pl: { lg: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH },
          top: "var(--template-frame-height, 0px)",
        }}
      >
        <Toolbar>
          <Box ml="auto" />
          <ActionButtons />
        </Toolbar>
      </AppBar>
      <Drawer
        aria-label="Main navigation"
        sx={{
          "& .MuiDrawer-paper": { width: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH },
        }}
        variant="permanent"
      >
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="nowrap"
          height={APP_BAR_HEIGHT}
          justifyContent="center"
          pl={2}
          sx={{ cursor: "default" }}
        >
          <Typography variant="button">{appConfig.name}</Typography>
          <Typography variant="caption">{email}</Typography>
        </Box>
        <NavigationLinks />
      </Drawer>
    </>
  );
}
