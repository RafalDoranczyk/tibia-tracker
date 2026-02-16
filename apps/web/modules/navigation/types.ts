import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import type { CharacterPaths } from "@/core/paths";
import type { NAVIGATION_IDS } from "./constants";

export type NavigationIcon =
  | { type: "mui"; node: ReactNode }
  | { type: "image"; src: StaticImageData };

export type NavigationId = (typeof NAVIGATION_IDS)[keyof typeof NAVIGATION_IDS];

// Definiujemy typ dla dynamicznego generatora ścieżek
export type DynamicPathGetter = (paths: CharacterPaths) => string;

export type NavigationLinkElementProps = {
  id: NavigationId;
  text: string;

  to: string | DynamicPathGetter;
  icon?: NavigationIcon;

  requiresCharacter?: boolean;
  children?: NavigationLinkElementProps[];
};

export type NavigationSection = {
  title: string;
  elements: NavigationLinkElementProps[];
};
