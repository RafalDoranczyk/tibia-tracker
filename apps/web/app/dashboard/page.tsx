import { redirect } from "next/navigation";
import { PATHS } from "@/core/paths";
import { getUserSettings } from "@/modules/user/server";

export default async function DashboardPage() {
  const settings = await getUserSettings();
  const activeId = settings?.last_active_character_id;

  if (activeId) {
    redirect(PATHS.CHARACTER(activeId).OVERVIEW);
  }

  redirect(PATHS.CHARACTERS);
}
