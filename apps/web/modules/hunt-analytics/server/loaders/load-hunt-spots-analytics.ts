import { mapHuntSpotsToUI } from "../../mappers/mapHuntSpotsToUI";
import { getHuntSpotsAnalytics } from "./get-hunt-spots-analytics";

export async function loadHuntSpotsAnalytics(characterId: string) {
  const data = await getHuntSpotsAnalytics(characterId);

  const mappedHuntSpots = mapHuntSpotsToUI(data);

  return mappedHuntSpots;
}
