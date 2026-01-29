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
  HuntSessionFormProvider,
  HuntSessionView,
} from "@/modules/hunt-sessions";
import { fetchItems } from "@/modules/items";

import type { CharacterPageProps } from "../../../types";

type EditHuntSessionPageProps = CharacterPageProps<{ id: string }>;

export default async function EditHuntSessionPage({ params }: EditHuntSessionPageProps) {
  const { characterId, id } = await params;
  const huntSessionId = Number(id);

  const [itemList, monsterList, huntPlaceList, supplyList, damageElementList, huntSession] =
    await Promise.all([
      fetchItems(),
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
          href={PATHS.CHARACTER(characterId).HUNT_SESSIONS.LIST}
        >
          Hunt Sessions
        </Link>

        <Typography color="text.primary">Edit Hunt Session</Typography>
      </Breadcrumbs>

      <PageHeader.Root title="Edit Hunt Session" description="Edit and review your hunt session." />

      <HuntSessionFormProvider huntSession={huntSession} placeId={huntPlaceList[0].id}>
        <HuntSessionView
          itemList={itemList}
          supplyList={supplyList}
          huntPlaceList={huntPlaceList}
          monsterList={monsterList}
          damageElementList={damageElementList}
        />
      </HuntSessionFormProvider>
    </>
  );
}
