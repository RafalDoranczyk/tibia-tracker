import AddIcon from "@mui/icons-material/Add";
import { PATHS } from "@/core/paths";
import { NAVIGATION_IMAGES } from "../images";
import type { NavigationSection } from "../types";

export const DESKTOP_APP_NAVIGATION_DRAWER_WIDTH = "250px";
export const APP_BAR_HEIGHT = "64px";

export const NAVIGATION_IDS = {
  DASHBOARD: "dashboard",
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
        id: NAVIGATION_IDS.DASHBOARD,
        text: "Dashboard",
        to: (p) => p.OVERVIEW,
        requiresCharacter: true,
        icon: { type: "image", src: NAVIGATION_IMAGES.character },
      },
      {
        id: NAVIGATION_IDS.BESTIARY,
        text: "Bestiary",
        to: (p) => p.BESTIARY,
        requiresCharacter: true,
        icon: { type: "image", src: NAVIGATION_IMAGES.monster },
      },
      {
        id: NAVIGATION_IDS.CHARMS,
        text: "Charms",
        to: (p) => p.CHARMS,
        requiresCharacter: true,
        icon: { type: "image", src: NAVIGATION_IMAGES.charms },
      },
      {
        id: NAVIGATION_IDS.HUNT_SESSIONS,
        text: "Hunt Sessions",
        to: (p) => p.HUNT_SESSIONS.LIST,
        requiresCharacter: true,
        icon: { type: "image", src: NAVIGATION_IMAGES.hunt },
        children: [
          {
            id: NAVIGATION_IDS.ADD_HUNT_SESSION,
            text: "Add New Session",
            to: (p) => p.HUNT_SESSIONS.NEW,
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
        to: (p) => p.HUNT_PLACES,
        requiresCharacter: true,
        icon: { type: "image", src: NAVIGATION_IMAGES.huntGold },
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
        icon: { type: "image", src: NAVIGATION_IMAGES.characters },
      },
    ],
  },
  {
    title: "Calculators",
    elements: [
      {
        id: NAVIGATION_IDS.IMBUING,
        text: "Imbuing",
        to: PATHS.CALCULATORS.IMBUING,
        icon: { type: "image", src: NAVIGATION_IMAGES.scroll },
      },
      {
        id: NAVIGATION_IDS.TRAINING_CALCULATOR,
        text: "Training",
        to: PATHS.CALCULATORS.TRAINING,
        icon: { type: "image", src: NAVIGATION_IMAGES.training },
      },
      {
        id: NAVIGATION_IDS.STAMINA_CALCULATOR,
        text: "Stamina",
        to: PATHS.CALCULATORS.STAMINA,
        icon: { type: "image", src: NAVIGATION_IMAGES.calculator },
      },
    ],
  },
];
