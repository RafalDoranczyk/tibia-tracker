"use client";

import Dashboard from "@mui/icons-material/Dashboard";
import { Box, List, ListItemButton, ListItemIcon, Tooltip, Typography } from "@mui/material";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { PATHS } from "@/constants";
import { useActiveCharacter } from "@/providers/feature/dashboard";

import { NAVIGATION_IMAGES } from "./images";

export type NavigationIcon =
  | { type: "mui"; node: ReactNode }
  | { type: "image"; src: StaticImageData };

export type NavigationLinkElementProps = {
  icon: NavigationIcon;
  id: string;
  text: string;
  to: string | ((paths: ReturnType<typeof PATHS.CHARACTER>) => string);
  requiresCharacter?: boolean;
};

type NavigationSection = {
  elements: NavigationLinkElementProps[];
  title: string;
};

// -------------------------------------
// Navigation Config
// -------------------------------------
const NAVIGATION_MODULES: NavigationSection[] = [
  {
    title: "Dashboard",
    elements: [
      {
        icon: {
          type: "mui",
          node: <Dashboard />,
        },
        id: "dashboard",
        text: "Dashboard",
        to: PATHS.DASHBOARD,
      },
    ],
  },

  {
    title: "Character Overview",
    elements: [
      {
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.character,
        },
        id: "character",
        text: "My character",
        to: (c) => c.OVERVIEW,
        requiresCharacter: true,
      },

      {
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.monster,
        },
        id: "bestiary",
        text: "Bestiary",
        to: (c) => c.BESTIARY,
        requiresCharacter: true,
      },
      // {
      //   icon: {
      //     type: "image",
      //     src: NAVIGATION_IMAGES.hunt,
      //   },
      //   id: "hunt-sessions",
      //   text: "Hunt sessions",
      //   to: (c) => c.HUNT_SESSIONS.LIST,
      //   requiresCharacter: true,
      // },
    ],
  },
  {
    title: "My Account",
    elements: [
      {
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.characters,
        },
        id: "characters",
        text: "Characters",
        to: PATHS.CHARACTERS,
      },
    ],
  },
  {
    title: "Utilities",
    elements: [
      {
        icon: {
          type: "image",
          src: NAVIGATION_IMAGES.scroll,
        },
        id: "imbuing",
        text: "Imbuing",
        to: PATHS.IMBUING,
      },
    ],
  },
];

// -------------------------------------
// Styles
// -------------------------------------
const SECTION_TITLE_STYLES = {
  color: "text.secondary",
  cursor: "default",
  fontSize: 12,
  fontWeight: 700,
  pl: 2,
  textTransform: "uppercase",
} as const;

// -------------------------------------
// Utils
// -------------------------------------
function resolvePath(to: NavigationLinkElementProps["to"], characterId?: string | null): string {
  if (typeof to === "function") {
    if (!characterId) return PATHS.CHARACTERS;
    return to(PATHS.CHARACTER(characterId));
  }

  return to;
}

function isPathActive(pathname: string, href: string) {
  const cleanPath = pathname.split("?")[0];

  const pathSegments = cleanPath.split("/").filter(Boolean);
  const hrefSegments = href.split("/").filter(Boolean);

  if (pathSegments.length === hrefSegments.length) {
    return cleanPath === href;
  }

  return false;
}

// -------------------------------------
// Single Link Element
// -------------------------------------
function NavigationLinkElement({
  icon,
  text,
  to,
  isSelected,
  disabled,
}: {
  icon: NavigationIcon;
  text: string;
  to: string;
  isSelected: boolean;
  disabled?: boolean;
}) {
  const content = (
    <ListItemButton
      component={Link}
      href={disabled ? "#" : to}
      selected={isSelected}
      disabled={disabled}
      sx={{
        textDecoration: "none",
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <ListItemIcon
        sx={{
          svg: {
            color: ({ palette }) => (isSelected ? palette.primary.main : "unset"),
            height: 20,
          },
        }}
      >
        {icon.type === "mui" ? (
          icon.node
        ) : (
          <Image src={icon.src} alt={text} width={20} height={20} />
        )}
      </ListItemIcon>
      <Typography
        color="textPrimary"
        fontWeight={isSelected ? "bold" : "normal"}
        variant="subtitle2"
      >
        {text}
      </Typography>
    </ListItemButton>
  );

  if (disabled) {
    return (
      <Tooltip title="Select a character first" placement="right">
        <Box>{content}</Box>
      </Tooltip>
    );
  }

  return content;
}

// -------------------------------------
// Main NavigationLinks Component
// -------------------------------------
export function NavigationLinks() {
  const pathname = usePathname();
  const { activeCharacterId } = useActiveCharacter();

  return (
    <>
      {NAVIGATION_MODULES.map(({ elements, title }) => (
        <Box key={title} mt={3}>
          <Typography sx={SECTION_TITLE_STYLES}>{title}</Typography>
          <List component="nav">
            {elements.map(({ icon, id, text, to, requiresCharacter }) => {
              const href = resolvePath(to, activeCharacterId);
              const selected = isPathActive(pathname, href);
              const disabled = requiresCharacter && !activeCharacterId;

              return (
                <NavigationLinkElement
                  key={id}
                  icon={icon}
                  text={text}
                  to={href}
                  isSelected={selected}
                  disabled={disabled}
                />
              );
            })}
          </List>
        </Box>
      ))}
    </>
  );
}
