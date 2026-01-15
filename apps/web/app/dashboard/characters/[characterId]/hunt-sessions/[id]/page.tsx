import {
  // fetchHuntSessionById,
  fetchMonsters,
  fetchSupplies,
  HuntSessionView,
} from "@/modules/hunt-sessions";
import { fetchHuntPlaces } from "@/modules/hunt-spots";

// type PageProps = {
//   params: Promise<{ characterId: string; id: string }>;
//   searchParams: Promise<Record<string, string | string[] | undefined>>;
// };

export default async function NewHuntSessionPage() {
  // const awaitedParams = await params;

  // const huntSessionId = awaitedParams.id;

  const [monsterList, places, suppliesList] = await Promise.all([
    fetchMonsters(),
    fetchHuntPlaces(),
    fetchSupplies(),
  ]);

  // const huntSession = await fetchHuntSessionById(huntSessionId);

  return <HuntSessionView suppliesList={suppliesList} places={places} monsterList={monsterList} />;
}
