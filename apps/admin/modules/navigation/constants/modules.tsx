import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { PATHS } from "@/core/paths";
import type { NavigationSection } from "../types";

export const NAVIGATION_IDS = {
  DASHBOARD: "dashboard",
  GLOBAL_CHARACTERS: "global_characters",
  LOGOUT: "logout",
} as const;

export const NAVIGATION_MODULES: NavigationSection[] = [
  {
    title: "Data ",
    elements: [
      {
        id: NAVIGATION_IDS.DASHBOARD,
        text: "Dashboard",
        to: PATHS.DASHBOARD,
        icon: <DashboardIcon />,
      },
      {
        id: NAVIGATION_IDS.GLOBAL_CHARACTERS,
        text: "Character List",
        to: PATHS.GLOBAL_CHARACTERS,
        icon: <PersonIcon />,
      },
      {
        id: NAVIGATION_IDS.LOGOUT,
        text: "Logout",
        to: "/logout",
        icon: <LogoutIcon />,
      },
    ],
  },
];
