import { redirect } from "next/navigation";
import { PATHS } from "@/core/paths";
import { getUserSettings } from "@/modules/user/server";

export default async function DashboardPage() {
  const settings = await getUserSettings();
  const activeId = settings?.last_active_character_id;

  // 1. Jeśli mamy zapisaną ostatnią postać, idziemy do niej
  if (activeId) {
    redirect(PATHS.CHARACTER(activeId).OVERVIEW);
  }

  // 2. Jeśli nie, idziemy do listy postaci, żeby użytkownik mógł jakąś wybrać/dodać
  redirect(PATHS.CHARACTERS);
}
