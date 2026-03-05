import AddIcon from "@mui/icons-material/Add";
import { PATHS } from "@/core/paths";
import { NAVIGATION_IMAGES } from "../images";
import type { NavigationSection, VocationRecord } from "../types";

export const NAVIGATION_IDS = {
  // Character Overview
  DASHBOARD: "dashboard",
  CHARMS: "charms",
  BESTIARY: "bestiary",
  // Hunting
  HUNT_SESSIONS: "hunt-sessions",
  ADD_HUNT_SESSION: "add-hunt-session",
  HUNT_ANALYTICS: "hunt-analytics",
  // Calculators
  IMBUING: "imbuing-calculator",
  TRAINING_CALCULATOR: "training-calculator",
  STAMINA_CALCULATOR: "stamina-calculator",
  // My Account
  CHARACTERS: "characters",
} as const;

export const NAVIGATION_MODULES: NavigationSection[] = [
  {
    title: "Character",
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
    ],
  },
  {
    title: "Hunting",
    elements: [
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
        id: NAVIGATION_IDS.HUNT_ANALYTICS,
        text: "Hunt Analytics",
        to: (p) => p.HUNT_ANALYTICS,
        requiresCharacter: true,
        icon: { type: "image", src: NAVIGATION_IMAGES.huntGold },
      },
    ],
  },
  {
    title: "Tools",
    elements: [
      {
        id: NAVIGATION_IDS.IMBUING,
        text: "Imbuing",
        to: PATHS.TOOLS.IMBUING,
        icon: { type: "image", src: NAVIGATION_IMAGES.scroll },
      },
      {
        id: NAVIGATION_IDS.TRAINING_CALCULATOR,
        text: "Training",
        to: PATHS.TOOLS.TRAINING,
        icon: { type: "image", src: NAVIGATION_IMAGES.training },
      },
      {
        id: NAVIGATION_IDS.STAMINA_CALCULATOR,
        text: "Stamina",
        to: PATHS.TOOLS.STAMINA,
        icon: { type: "image", src: NAVIGATION_IMAGES.calculator },
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
];

export const VOCATION_COLORS: VocationRecord = {
  "Elite Knight": "#ef4444",
  Knight: "#ef4444",
  "Master Sorcerer": "#a855f7",
  Sorcerer: "#a855f7",
  "Elder Druid": "#3b82f6",
  Druid: "#3b82f6",
  "Royal Paladin": "#f59e0b",
  Paladin: "#f59e0b",
  Monk: "#10b981",
  "Exalted Monk": "#10b981",
  none: "#94a3b8",
};
