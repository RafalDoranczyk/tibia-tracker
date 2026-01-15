import { Stack } from "@mui/material";

import { fetchHuntSessions, fetchMonsters, HuntSessionsView } from "@/modules/hunt-sessions";

export default async function HuntSessions() {
  const { data: huntSessions, count } = await fetchHuntSessions();
  const monsters = await fetchMonsters();

  return (
    <Stack spacing={3}>
      <HuntSessionsView monsters={monsters} huntSessions={huntSessions} count={count} />
    </Stack>
  );
}
