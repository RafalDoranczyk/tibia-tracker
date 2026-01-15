import { fetchMonsters, fetchSupplies, HuntSessionView } from "@/modules/hunt-sessions";
import { fetchHuntPlaces } from "@/modules/hunt-spots";

export default async function NewHuntSessionPage() {
  const [monsterList, places, suppliesList] = await Promise.all([
    fetchMonsters(),
    fetchHuntPlaces(),
    fetchSupplies(),
  ]);

  return <HuntSessionView suppliesList={suppliesList} places={places} monsterList={monsterList} />;
}
