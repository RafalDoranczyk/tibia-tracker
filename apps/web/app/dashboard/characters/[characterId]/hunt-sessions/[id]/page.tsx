import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import LinkNext from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/layout/page";
import { fetchHuntPlaces } from "@/modules/hunt-places";
import {
  fetchDamageElements,
  fetchHuntSession,
  fetchMonstersPreview,
  fetchPreyBonuses,
  fetchSupplies,
  HuntSessionFormProvider,
  HuntSessionView,
} from "@/modules/hunt-sessions";
import { fetchItems } from "@/modules/items";
import { PATHS } from "@/paths";

import type { CharacterPageProps } from "../../../../types";

type EditHuntSessionPageProps = CharacterPageProps;

export default async function EditHuntSessionPage({ params }: EditHuntSessionPageProps) {
  const { characterId, id } = await params;
  const huntSessionId = Number(id);

  const [
    itemList,
    monsterList,
    huntPlaceList,
    supplyList,
    damageElementList,
    preyBonusList,
    huntSession,
  ] = await Promise.all([
    fetchItems(),
    fetchMonstersPreview(),
    fetchHuntPlaces(),
    fetchSupplies(),
    fetchDamageElements(),
    fetchPreyBonuses(),
    fetchHuntSession({ id: huntSessionId, character_id: characterId }),
  ]);

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
        <Link
          component={LinkNext}
          underline="hover"
          color="inherit"
          href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.LIST}
        >
          Hunt Sessions
        </Link>

        <Typography color="text.primary">Edit Hunt Session</Typography>
      </Breadcrumbs>

      <PageHeader title="Edit Hunt Session" description="Edit and review your hunt session." />

      <HuntSessionFormProvider huntSession={huntSession} placeId={huntPlaceList[0].id}>
        <HuntSessionView
          huntSessionId={huntSession?.id}
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
