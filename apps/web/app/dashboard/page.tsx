import { redirect } from "next/navigation";

import { loadUser } from "@/modules/user";
import { PATHS } from "@/paths";

// There is no dashboard content itself, just redirect to last active character or characters list
export default async function DashboardPage() {
  const { settings } = await loadUser();

  if (settings?.last_active_character_id) {
    redirect(PATHS.CHARACTER(settings.last_active_character_id).OVERVIEW);
  }

  redirect(PATHS.CHARACTERS); // fallback
}
