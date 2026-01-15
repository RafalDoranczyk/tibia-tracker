import type { Character } from "@/modules/characters";

import { NavigationLinks } from "../NavigationLinks";
import { DesktopNavigationBar } from "./DesktopNavigationBar";
import { DesktopNavigationDrawer } from "./DesktopNavigationDrawer";

type DesktopNavigationProps = {
  characters: Character[];
};

export function DesktopNavigation({ characters }: DesktopNavigationProps) {
  return (
    <>
      <DesktopNavigationBar characters={characters} />
      <DesktopNavigationDrawer>
        <NavigationLinks />
      </DesktopNavigationDrawer>
    </>
  );
}
