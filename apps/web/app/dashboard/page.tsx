import { redirect } from "next/navigation";

import { loadUser } from "@/modules/user";
import { PATHS } from "@/paths";

export default async function DashboardPage() {
  const { settings } = await loadUser();

  if (settings?.last_active_character_id) {
    redirect(PATHS.CHARACTER(settings.last_active_character_id).OVERVIEW);
  }

  redirect(PATHS.CHARACTERS); // fallback
}
