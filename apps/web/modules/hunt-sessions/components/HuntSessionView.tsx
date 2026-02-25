"use client";

import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { FloatingActionButton } from "@/components";
import { PATHS } from "@/core/paths";
import { useToast } from "@/hooks";
import { useRequiredCharacterId } from "@/modules/characters";
import type { CharacterCharmDetailed } from "@/modules/charms";
import type { DamageElement } from "@/modules/damage-elements";
import type { HuntPlace } from "@/modules/hunt-places";
import type { ItemPreview } from "@/modules/items";
import type { PreyBonus } from "@/modules/prey-bonus";
import { createHuntSession } from "../actions/create-hunt-session";
import { updateHuntSession } from "../actions/update-hunt-session";
import { useHuntSessionForm } from "../hooks/useHuntSessionForm";
import { mapHuntSessionFormToPayload } from "../mappers/mapHuntSessionFormToPayload";
import type { HuntSession, HuntSessionUnknownEntities, MonsterPreview } from "../schemas";
import { FloatingStatsPanel } from "./FloatingStatsPanel";
import { SummaryStats } from "./SummaryStats";
import { DamageTab } from "./tabs/damage/DamageTab";
import { LogDetailsTab } from "./tabs/log-details/LogDetailsTab";
import { SuppliesTab } from "./tabs/supplies/SuppliesTab";
import { UnknownEntitiesModal } from "./UnknownEntitiesModal";

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

  const [unknownEntitiesModalOpen, setUnknownEntitiesModalOpen] = useState(false);
  const [unknownEntities, setUnknownEntities] = useState<HuntSessionUnknownEntities>(null);
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
            unknownEntities={unknownEntities}
            setUnknownEntities={setUnknownEntities}
            openUnknownEntitiesModal={() => setUnknownEntitiesModalOpen(true)}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <DamageTab monsterList={monsterList} damageElementList={damageElementList} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <SuppliesTab supplyList={supplyList} />
        </TabPanel>

        <FloatingStatsPanel />

        <UnknownEntitiesModal
          open={unknownEntitiesModalOpen}
          unknownEntities={unknownEntities}
          onClose={() => setUnknownEntitiesModalOpen(false)}
        />

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
