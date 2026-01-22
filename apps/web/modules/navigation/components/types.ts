import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

import type { PATHS } from "@/constants";

export type NavigationIcon =
  | { type: "mui"; node: ReactNode }
  | { type: "image"; src: StaticImageData };

export type NavigationLinkElementProps = {
  id: string;
  text: string;
  to: string | ((paths: ReturnType<typeof PATHS.CHARACTER>) => string);
  icon?: NavigationIcon;
  requiresCharacter?: boolean;
  matchStrategy?: "exact" | "prefix";
  children?: NavigationLinkElementProps[];
};

export type NavigationSection = {
  title: string;
  elements: NavigationLinkElementProps[];
};
