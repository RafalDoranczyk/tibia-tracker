"use client";

import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import type {
  CharacterCharmDetailed,
  DamageElement,
  HuntPlace,
  HuntSession,
  ItemPreview,
  MonsterPreview,
  PreyBonus,
} from "@repo/database";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { FloatingActionButton } from "@/components";
import { PATHS } from "@/core/paths";
import { useToast } from "@/hooks";
import { useRequiredCharacterId } from "@/modules/characters";
import { createHuntSession } from "../actions/create-hunt-session";
import { updateHuntSession } from "../actions/update-hunt-session";
import { useHuntSessionForm } from "../hooks/useHuntSessionForm";
import { mapHuntSessionFormToPayload } from "../mappers/mapHuntSessionFormToPayload";
import { FloatingStatsPanel } from "./FloatingStatsPanel";
import { SummaryStats } from "./SummaryStats";
import { DamageTab } from "./tabs/damage/DamageTab";
import { LogDetailsTab } from "./tabs/log-details/LogDetailsTab";
import { SuppliesTab } from "./tabs/supplies/SuppliesTab";

function TabPanel({
  value,
  index,
  children,
}: React.PropsWithChildren<{ value: number; index: number }>) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && children}
    </Box>
  );
}

type HuntSessionViewProps = {
  monsterList: MonsterPreview[];
  itemList: ItemPreview[];
  huntPlaceList: HuntPlace[];
  supplyList: ItemPreview[];
  damageElementList: DamageElement[];
  preyBonusList: PreyBonus[];
  characterCharmList: CharacterCharmDetailed[];
  huntSession?: HuntSession;
};

export function HuntSessionView({
  monsterList,
  itemList,
  huntPlaceList,
  supplyList,
  damageElementList,
  preyBonusList,
  characterCharmList,
  huntSession,
}: HuntSessionViewProps) {
  const characterId = useRequiredCharacterId();
  const router = useRouter();
  const toast = useToast();

  const [tab, setTab] = useState(0);

  const form = useHuntSessionForm(huntSession);

  const { formState, handleSubmit } = form;

  const saveHuntSession = handleSubmit(async (formData) => {
    try {
      const formPayload = mapHuntSessionFormToPayload({ formData, characterId });

      if (huntSession?.id) {
        await updateHuntSession({ ...formPayload, id: huntSession.id });
      } else {
        await createHuntSession(formPayload);
      }

      toast.success("Hunt session saved");
      router.push(PATHS.CHARACTER(characterId).HUNT_SESSIONS.LIST);
    } catch {
      toast.error("Hunt session saving error");
    }
  });

  return (
    <FormProvider {...form}>
      <Container maxWidth="xl">
        <SummaryStats preyBonusList={preyBonusList} monsterList={monsterList} />

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            my: 2,
          }}
        >
          <Tab id="tab-0" aria-controls="tabpanel-0" label="Log Details" />
          <Tab id="tab-1" aria-controls="tabpanel-1" label="Damage Elements And Sources" />
          <Tab id="tab-2" aria-controls="tabpanel-2" label="Supplies" />
        </Tabs>

        <Divider sx={{ my: 2 }} />

        <TabPanel value={tab} index={0}>
          <LogDetailsTab
            characterCharmList={characterCharmList}
            preyBonusList={preyBonusList}
            huntPlaceList={huntPlaceList}
            itemList={itemList}
            monsterList={monsterList}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <DamageTab monsterList={monsterList} damageElementList={damageElementList} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <SuppliesTab supplyList={supplyList} />
        </TabPanel>

        <FloatingStatsPanel />

        <FloatingActionButton
          visible={formState.isDirty}
          loading={formState.isSubmitting}
          onClick={saveHuntSession}
        >
          Save changes
        </FloatingActionButton>
      </Container>
    </FormProvider>
  );
}
