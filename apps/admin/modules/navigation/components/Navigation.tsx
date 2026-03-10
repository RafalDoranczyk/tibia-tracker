import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";
import { APP_BAR_HEIGHT, DESKTOP_APP_NAVIGATION_DRAWER_WIDTH } from "../constants";
import { Drome } from "./Drome";
import { NavigationLinks } from "./NavigationLinks";
import { Rashid } from "./Rashid";

export function Navigation() {
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
          <Rashid />
          <Drome />
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
          <Typography variant="button">ADMIN</Typography>
        </Box>
        <NavigationLinks />
      </Drawer>
    </>
  );
}
