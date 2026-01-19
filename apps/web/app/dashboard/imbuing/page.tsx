import { fetchImbuingItemPrices, ImbuingView } from "@/modules/imbuing";

export default async function ImbuingPage() {
  const imbuingItemPrices = await fetchImbuingItemPrices();

  return <ImbuingView imbuingItemPrices={imbuingItemPrices} />;
}
