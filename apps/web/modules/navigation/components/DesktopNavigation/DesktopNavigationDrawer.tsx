import { Box, Drawer, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import { APP_NAME } from "@/constants";
import { getUser } from "@/modules/user";

export const DESKTOP_APP_NAVIGATION_DRAWER_WIDTH = "240px";
export const APP_BAR_HEIGHT = "64px";

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
        <Typography variant="button">{APP_NAME}</Typography>
        <Typography variant="caption">{email}</Typography>
      </Box>
      {children}
    </Drawer>
  );
}
