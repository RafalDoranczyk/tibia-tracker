import { fetchHuntSessionList } from "../actions/fetchHuntSessionList";
import type { HuntSessionListFilters } from "../schemas";

type LoadHuntSessionListProps = {
  character_id: string;
  filters: HuntSessionListFilters;
};

export async function loadHuntSessionList({ character_id, filters }: LoadHuntSessionListProps) {
  const { data, count } = await fetchHuntSessionList({ character_id, ...filters });

  return {
    data,
    count,
  };
}
