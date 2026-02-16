import type { Metadata } from "next";
import { PageHeader } from "@/layout/page/PageHeader";
import type { CharacterPageProps } from "../../types";

export const metadata: Metadata = {
  title: "Your Character",
  description: "View and manage your character details.",
};

export default async function DashboardPage({ params }: CharacterPageProps) {
  const { characterId } = await params;

  return (
    <>
      <PageHeader title="Your Character" />
      <div>characterId: {characterId}</div>
    </>
  );
}
