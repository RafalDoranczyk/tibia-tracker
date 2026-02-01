import { Box, Drawer, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import { appConfig } from "@/config";
import { getUser } from "@/modules/user";

import { APP_BAR_HEIGHT, DESKTOP_APP_NAVIGATION_DRAWER_WIDTH } from "../../constants";

export async function DesktopNavigationDrawer({ children }: PropsWithChildren) {
  const user = await getUser();

  const email = user.email || "Unknown user";

  return (
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
      {children}
    </Drawer>
  );
}
