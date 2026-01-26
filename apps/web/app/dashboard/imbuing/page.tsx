import { PageHeader } from "@/components";
import { fetchImbuingItemPrices, ImbuingView } from "@/modules/imbuing";

export default async function ImbuingPage() {
  const imbuingItemPrices = await fetchImbuingItemPrices();

  return (
    <>
      <PageHeader.Root
        title="Imbuing prices"
        description="Calculate real imbuing costs and profits based on current market prices."
      />
      <ImbuingView imbuingItemPrices={imbuingItemPrices} />
    </>
  );
}
