import { redirect } from "next/navigation";

import { PATHS } from "@/core/paths";
import { loadUserSettings } from "@/modules/user";

// There is no dashboard content itself, just redirect to last active character or characters list
export default async function DashboardPage() {
  const settings = await loadUserSettings();

  if (settings?.last_active_character_id) {
    redirect(PATHS.CHARACTER(settings.last_active_character_id).OVERVIEW);
  }

  redirect(PATHS.CHARACTERS); // fallback
}
