import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your account, characters, and activity.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your account, characters, and activity."
      />
    </>
  );
}
