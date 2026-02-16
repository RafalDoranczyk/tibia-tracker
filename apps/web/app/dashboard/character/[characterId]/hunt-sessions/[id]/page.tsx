import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { NextLink } from "@/components";
import { PATHS } from "@/core/paths";
import { PageHeader } from "@/layout/page/PageHeader";
import { HuntSessionFormProvider, HuntSessionView } from "@/modules/hunt-sessions";
import { loadHuntSession } from "@/modules/hunt-sessions/server";
import type { CharacterPageProps } from "../../../../types";

export const metadata: Metadata = {
  title: "Hunt Session",
  description: "Edit and review your hunt session.",
};

type EditHuntSessionPageProps = CharacterPageProps;

export default async function EditHuntSessionPage({ params }: EditHuntSessionPageProps) {
  const { characterId, id } = await params;
  const huntSessionId = Number(id);

  const {
    itemList,
    monsterList,
    huntPlaceList,
    supplyList,
    damageElementList,
    preyBonusList,
    huntSession,
    characterCharmList,
  } = await loadHuntSession({
    characterId,
    huntSessionId,
  });

  if (!huntSession) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2, color: "text.secondary" }}
      >
        <Button
          component={NextLink}
          color="inherit"
          href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.LIST}
        >
          Hunt Sessions
        </Button>

        <Typography color="text.primary">Edit Hunt Session</Typography>
      </Breadcrumbs>

      <PageHeader title="Edit Hunt Session" description="Edit and review your hunt session." />

      <HuntSessionFormProvider huntSession={huntSession} placeId={huntPlaceList[0].id}>
        <HuntSessionView
          huntSessionId={huntSession?.id}
          itemList={itemList}
          characterCharmList={characterCharmList}
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
