import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import type { Metadata } from "next";
import LinkNext from "next/link";

import { PATHS } from "@/core/paths";
import { PageHeader } from "@/layout/page";
import { HuntSessionFormProvider, HuntSessionView, loadHuntSession } from "@/modules/hunt-sessions";

import type { CharacterPageProps } from "../../../../types";

export const metadata: Metadata = {
  title: "Hunt Session",
  description: "Create and analyze your hunt session.",
};

export default async function NewHuntSessionPage({ params }: CharacterPageProps) {
  const { characterId } = await params;

  const {
    itemList,
    monsterList,
    huntPlaceList,
    supplyList,
    damageElementList,
    preyBonusList,
    characterCharmList,
  } = await loadHuntSession({
    characterId,
  });

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

      <PageHeader
        title="Add Hunt Session"
        description={`Create and analyze your hunt session.
          Paste your Tibia session log to automatically calculate experience, profit, supplies, damage, and monster statistics`}
      />

      <HuntSessionFormProvider placeId={huntPlaceList[0].id}>
        <HuntSessionView
          characterCharmList={characterCharmList}
          itemList={itemList}
          supplyList={supplyList}
          huntPlaceList={huntPlaceList}
          monsterList={monsterList}
          preyBonusList={preyBonusList}
          damageElementList={damageElementList}
        />
      </HuntSessionFormProvider>
    </>
  );
}
