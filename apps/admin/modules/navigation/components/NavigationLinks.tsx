"use client";

import { Box, List, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_MODULES } from "../constants";
import type { NavigationLinkElementProps } from "../types";
import { isPathActive } from "../utils/isPathActive";

// -------------------------------------
// Single Link Element
// -------------------------------------

type NavItemProps = {
  element: NavigationLinkElementProps;
  pathname: string;
  depth?: number;
};

function NavItem({ element, pathname, depth = 0 }: NavItemProps) {
  const { icon, text, to, children } = element;

  const isSelected = to ? isPathActive(pathname, to) : false;

  const isSubItem = depth > 0;

  return (
    <>
      <ListItemButton
        component={Link}
        href={to ?? "#"}
        selected={isSelected}
        sx={{
          pl: isSubItem ? 0 : 2,
          pr: 1,
          borderRadius: 1,
          mx: 1,
          mb: 0.25,
          py: isSubItem ? 0.3 : 0.6,
          minHeight: isSubItem ? 28 : 36,
          "&.Mui-selected": {
            bgcolor: "action.selected",
          },
        }}
      >
        {icon && (
          <ListItemIcon sx={{ minWidth: 30 }}>
            <Box sx={{ fontSize: isSubItem ? 12 : 20, display: "flex" }}>{icon}</Box>
          </ListItemIcon>
        )}

        {!icon && isSubItem && <Box sx={{ width: 8 }} />}

        <Typography
          variant="body2"
          color={isSelected ? "secondary.light" : "text.primary"}
          fontWeight={isSelected ? 600 : 400}
          sx={{
            fontSize: isSubItem ? "0.8rem" : ".95rem",
            lineHeight: 1.2,
          }}
        >
          {text}
        </Typography>
      </ListItemButton>

      {children && (
        <Box
          sx={{
            ml: 5,
            borderLeft: "1px solid",
            borderColor: "divider",
            my: 0.25,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children.map((child) => (
            <NavItem key={child.id} element={child} pathname={pathname} depth={depth + 1} />
          ))}
        </Box>
      )}
    </>
  );
}

export function NavigationLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAVIGATION_MODULES.map(({ elements, title }) => (
        <Box key={title} mt={2}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 700,
              pl: 2,
              mb: 0.5,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "default",
            }}
          >
            {title}
          </Typography>

          <List component="nav" disablePadding>
            {elements.map((element) => (
              <NavItem key={element.id} element={element} pathname={pathname} />
            ))}
          </List>
        </Box>
      ))}
    </>
  );
}
