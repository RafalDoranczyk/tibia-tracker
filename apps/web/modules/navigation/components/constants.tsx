import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { PATHS } from "@/constants";

import { NAVIGATION_IMAGES } from "./images";
import type { NavigationSection } from "./types";

export const NAVIGATION_MODULES: NavigationSection[] = [
  {
    title: "Dashboard",
    elements: [
      {
        id: "dashboard",
        text: "Dashboard",
        to: PATHS.DASHBOARD,
        icon: {
          type: "mui",
          node: <DashboardIcon />,
        },
      },
    ],
  },
  {
    title: "Character Overview",
    elements: [
      {
        id: "character",
        text: "My Character",
        to: (c) => c.OVERVIEW,
        requiresCharacter: true,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.character,
        },
      },
      {
        id: "bestiary",
        text: "Bestiary",
        to: (c) => c.BESTIARY,
        requiresCharacter: true,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.monster,
        },
      },
      {
        id: "hunt-sessions",
        text: "Hunt Sessions",
        to: (c) => c.HUNT_SESSIONS.LIST,
        requiresCharacter: true,
        matchStrategy: "prefix",
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.hunt,
        },
        children: [
          {
            id: "add-hunt-session",
            text: "Add New Session",
            to: (c) => c.HUNT_SESSIONS.NEW,
            requiresCharacter: true,
            icon: {
              type: "mui",
              node: <AddIcon fontSize="small" />,
            },
          },
        ],
      },
      {
        id: "hunt-places",
        text: "Hunt Places",
        to: (c) => c.HUNT_PLACES,
        requiresCharacter: true,
        matchStrategy: "prefix",
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.huntGold,
        },
      },
    ],
  },
  {
    title: "My Account",
    elements: [
      {
        id: "characters",
        text: "Characters",
        to: PATHS.CHARACTERS,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.characters,
        },
      },
    ],
  },
  {
    title: "Utilities",
    elements: [
      {
        id: "imbuing",
        text: "Imbuing",
        to: PATHS.IMBUING,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.scroll,
        },
      },
      {
        id: "stamina-calculator",
        text: "Stamina Calculator",
        to: PATHS.STAMINA_CALCULATOR,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.calculator,
        },
      },
      {
        id: "training-calculator",
        text: "Training Calculator",
        to: PATHS.TRAINING_CALCULATOR,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.training,
        },
      },
    ],
  },
];
