import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import LinkNext from "next/link";

import { PageHeader } from "@/components";
import { PATHS } from "@/constants";
import { fetchHuntPlaces } from "@/modules/hunt-places";
import {
  fetchDamageElements,
  fetchHuntSession,
  fetchMonstersPreview,
  fetchSupplies,
  HuntSessionView,
} from "@/modules/hunt-sessions";

import type { CharacterRouteParams } from "../../../types";

type EditHuntSessionPageProps = {
  params: Promise<CharacterRouteParams & { id: string }>;
};

export default async function EditHuntSessionPage({ params }: EditHuntSessionPageProps) {
  const awaitedParams = await params;
  const huntSessionId = Number(awaitedParams.id);

  const [monsterList, huntPlaceList, supplyList, damageElementList, huntSession] =
    await Promise.all([
      fetchMonstersPreview(),
      fetchHuntPlaces(),
      fetchSupplies(),
      fetchDamageElements(),
      fetchHuntSession(huntSessionId),
    ]);

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2, color: "text.secondary" }}
      >
        <Link
          component={LinkNext}
          underline="hover"
          color="inherit"
          href={PATHS.CHARACTER(awaitedParams.characterId).HUNT_SESSIONS.LIST}
        >
          Hunt Sessions
        </Link>

        <Typography color="text.primary">Edit Hunt Session</Typography>
      </Breadcrumbs>

      <PageHeader.Root title="Edit Hunt Session" description="Edit and review your hunt session." />

      <HuntSessionView
        supplyList={supplyList}
        huntPlaceList={huntPlaceList}
        monsterList={monsterList}
        damageElementList={damageElementList}
        huntSession={huntSession}
      />
    </>
  );
}
