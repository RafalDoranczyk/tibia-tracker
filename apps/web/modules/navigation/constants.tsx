import AddIcon from "@mui/icons-material/Add";

import { PATHS } from "@/paths";

import { NAVIGATION_IMAGES } from "./images";
import type { NavigationSection } from "./types";

export const DESKTOP_APP_NAVIGATION_DRAWER_WIDTH = "240px";
export const APP_BAR_HEIGHT = "64px";

export const NAVIGATION_IDS = {
  CHARACTER: "character",
  CHARMS: "charms",
  BESTIARY: "bestiary",
  HUNT_SESSIONS: "hunt-sessions",
  HUNT_PLACES: "hunt-places",
  ADD_HUNT_SESSION: "add-hunt-session",
  CHARACTERS: "characters",
  IMBUING: "imbuing",
  TRAINING_CALCULATOR: "training-calculator",
  STAMINA_CALCULATOR: "stamina-calculator",
} as const;

export const NAVIGATION_MODULES: NavigationSection[] = [
  {
    title: "Character Overview",
    elements: [
      {
        id: NAVIGATION_IDS.CHARACTER,
        text: "My Character",
        to: (c) => c.OVERVIEW,
        requiresCharacter: true,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.character,
        },
      },
      {
        id: NAVIGATION_IDS.CHARMS,
        text: "Charms",
        to: (c) => c.CHARMS,
        requiresCharacter: true,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.charms,
        },
      },
      {
        id: NAVIGATION_IDS.BESTIARY,
        text: "Bestiary",
        to: (c) => c.BESTIARY,
        requiresCharacter: true,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.monster,
        },
      },
      {
        id: NAVIGATION_IDS.HUNT_SESSIONS,
        text: "Hunt Sessions",
        to: (c) => c.HUNT_SESSIONS.LIST,
        requiresCharacter: true,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.hunt,
        },
        children: [
          {
            id: NAVIGATION_IDS.ADD_HUNT_SESSION,
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
        id: NAVIGATION_IDS.HUNT_PLACES,
        text: "Hunt Places",
        to: (c) => c.HUNT_PLACES,
        requiresCharacter: true,
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
        id: NAVIGATION_IDS.CHARACTERS,
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
        id: NAVIGATION_IDS.IMBUING,
        text: "Imbuing",
        to: PATHS.IMBUING,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.scroll,
        },
      },
      {
        id: NAVIGATION_IDS.TRAINING_CALCULATOR,
        text: "Training Calculator",
        to: PATHS.TRAINING_CALCULATOR,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.training,
        },
      },
      {
        id: NAVIGATION_IDS.STAMINA_CALCULATOR,
        text: "Stamina Calculator",
        to: PATHS.STAMINA_CALCULATOR,
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.calculator,
        },
      },
    ],
  },
];
