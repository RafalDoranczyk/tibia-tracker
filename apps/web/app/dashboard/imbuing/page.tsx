import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { ImbuingView } from "@/modules/imbuing";
import { getImbuingItemPrices } from "@/modules/imbuing/server";

export const metadata: Metadata = {
  title: "Imbuing Prices",
  description: "Calculate real imbuing costs and profits based on current market prices.",
};

export default async function ImbuingPage() {
  const imbuingItemPrices = await getImbuingItemPrices();

  return (
    <>
      <PageHeader
        title="Imbuing Prices"
        description="Calculate real imbuing costs and profits based on current market prices."
      />
      <ImbuingView imbuingItemPrices={imbuingItemPrices} />
    </>
  );
}
