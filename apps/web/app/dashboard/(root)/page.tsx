import { redirect } from "next/navigation";

import { fetchCharacters } from "@/modules/characters";

export default async function DashboardRootPage() {
  const characters = await fetchCharacters();

  if (!characters.length) {
    redirect("/onboarding/add-character");
  }

  const firstCharacter = characters[0];
  redirect(`/dashboard/characters/${firstCharacter.id}`);
}
