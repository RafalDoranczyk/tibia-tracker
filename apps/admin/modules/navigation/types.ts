import type { ReactNode } from "react";
import type { NAVIGATION_IDS } from "./constants";

export type NavigationId = (typeof NAVIGATION_IDS)[keyof typeof NAVIGATION_IDS];

export type NavigationLinkElementProps = {
  id: NavigationId;
  text: string;
  to: string;
  icon?: ReactNode;
  children?: NavigationLinkElementProps[];
};

export type NavigationSection = {
  title: string;
  elements: NavigationLinkElementProps[];
};
