import { fetchAvgExpLastFive } from "@/modules/hunt-sessions";
import { HuntSpotsView } from "@/modules/hunt-spots";

export default async function HuntSpots() {
  const data = await fetchAvgExpLastFive();

  return <HuntSpotsView data={data} />;
}
