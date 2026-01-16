import { fetchImbuItemPrices, ImbuingView } from "@/modules/imbuing";

export default async function ImbuingPage() {
  const imbuingItemPrices = await fetchImbuItemPrices();

  return <ImbuingView imbuingItemPrices={imbuingItemPrices} />;
}
