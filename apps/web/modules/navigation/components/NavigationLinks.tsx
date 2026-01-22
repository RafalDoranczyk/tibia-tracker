"use client";

import { Box, List, ListItemButton, ListItemIcon, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useActiveCharacter } from "@/providers/feature/dashboard";

import { NAVIGATION_MODULES } from "./constants";
import type { NavigationLinkElementProps } from "./types";
import { isPathActive } from "./utils/isPathActive";
import { resolvePath } from "./utils/resolvePath";

// -------------------------------------
// Single Link Element
// -------------------------------------
function NavItem({
  element,
  depth = 0,
}: {
  element: NavigationLinkElementProps;
  depth?: number;
}) {
  const pathname = usePathname();
  const { activeCharacterId } = useActiveCharacter();

  const { icon, text, to, requiresCharacter, matchStrategy, children } = element;

  const href = resolvePath(to, activeCharacterId);
  const isSelected = isPathActive(pathname, href, matchStrategy);
  const disabled = requiresCharacter && !activeCharacterId;

  const isSubItem = depth > 0;

  const content = (
    <ListItemButton
      component={Link}
      href={disabled ? "#" : href}
      selected={isSelected}
      disabled={disabled}
      sx={{
        pl: 2,
        borderRadius: 1,
        mx: 1,
        mb: 0.5,
        py: isSubItem ? 0.5 : 1,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: 36 }}>
          {icon.type === "mui" ? (
            icon.node
          ) : (
            <Image
              src={icon.src}
              alt={text}
              width={isSubItem ? 16 : 24}
              height={isSubItem ? 16 : 24}
            />
          )}
        </ListItemIcon>
      )}

      {!icon && isSubItem && <Box sx={{ width: 12 }} />}

      <Typography
        variant="body2"
        color={isSelected ? "primary.main" : "text.primary"}
        fontWeight={isSelected ? 600 : 400}
        fontSize={isSubItem ? "0.8rem" : "0.9rem"}
      >
        {text}
      </Typography>
    </ListItemButton>
  );

  return (
    <>
      {disabled ? (
        <Tooltip title="Select a character first" placement="right">
          <Box>{content}</Box>
        </Tooltip>
      ) : (
        content
      )}

      {children && (
        <Box
          sx={{
            ml: 3.5,
            borderLeft: "1px solid",
            borderColor: "divider",
            my: 0.5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children.map((child) => (
            <NavItem key={child.id} element={child} depth={depth + 1} />
          ))}
        </Box>
      )}
    </>
  );
}

// -------------------------------------
// Main NavigationLinks Component
// -------------------------------------
export function NavigationLinks() {
  return (
    <>
      {NAVIGATION_MODULES.map(({ elements, title }) => (
        <Box key={title} mt={3}>
          <Typography
            sx={{
              color: "text.secondary",
              cursor: "default",
              fontSize: 12,
              fontWeight: 700,
              pl: 2,
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <List component="nav" disablePadding>
            {elements.map((element) => (
              <NavItem key={element.id} element={element} />
            ))}
          </List>
        </Box>
      ))}
    </>
  );
}
