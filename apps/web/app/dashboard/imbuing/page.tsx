import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { fetchImbuingItemPrices, ImbuingView } from "@/modules/imbuing";

export const metadata: Metadata = {
  title: "Imbuing Prices",
  description: "Calculate real imbuing costs and profits based on current market prices.",
};

export default async function ImbuingPage() {
  const imbuingItemPrices = await fetchImbuingItemPrices();

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
