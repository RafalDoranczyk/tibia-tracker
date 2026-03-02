import type { Metadata } from "next";
import { PageHeader } from "@/layout/page/PageHeader";
import { getCharacterLast30DaysExp } from "@/modules/character/server";
import type { CharacterPageProps } from "../../types";

export const metadata: Metadata = {
  title: "Your Character",
  description: "View and manage your character details.",
};

export default async function DashboardPage({ params }: CharacterPageProps) {
  const { characterId } = await params;

  const a = await getCharacterLast30DaysExp(characterId);
  console.log(a);
  return (
    <>
      <PageHeader title="Your Character" />
      <div>characterId: {characterId}</div>
    </>
  );
}
