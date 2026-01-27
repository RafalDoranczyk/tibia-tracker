import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import LinkNext from "next/link";

import { PageHeader } from "@/components";
import { PATHS } from "@/constants";
import { fetchHuntPlaces } from "@/modules/hunt-places";
import {
  fetchDamageElements,
  fetchMonstersPreview,
  fetchSupplies,
  HuntSessionView,
} from "@/modules/hunt-sessions";

import type { CharacterPageProps } from "../../../types";

export default async function NewHuntSessionPage({ params }: CharacterPageProps) {
  const { characterId } = await params;

  const [monsterList, huntPlaceList, supplyList, damageElementList] = await Promise.all([
    fetchMonstersPreview(),
    fetchHuntPlaces(),
    fetchSupplies(),
    fetchDamageElements(),
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
          href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.LIST}
        >
          Hunt Sessions
        </Link>

        <Typography color="text.primary">New Hunt Session</Typography>
      </Breadcrumbs>

      <PageHeader.Root title="Add Hunt Session" description="Create your hunt session." />

      <HuntSessionView
        supplyList={supplyList}
        huntPlaceList={huntPlaceList}
        monsterList={monsterList}
        damageElementList={damageElementList}
      />
    </>
  );
}
