"use client";

import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { FloatingActionButton } from "@/components";
import type { CharacterCharmDetailed } from "@/modules/charms";
import type { HuntPlace } from "@/modules/hunt-places";
import type { ItemPreview } from "@/modules/items";

import { useSaveHuntSession } from "../hooks/useSaveHuntSession";
import type {
  DamageElement,
  HuntSession,
  HuntSessionForm,
  HuntSessionUnknownEntities,
  MonsterPreview,
  PreyBonus,
} from "../schemas";
import { ScannerModal } from "./ai/ScannerModal";
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
  huntSessionId?: HuntSession["id"];
};

export function HuntSessionView({
  monsterList,
  itemList,
  huntPlaceList,
  supplyList,
  damageElementList,
  preyBonusList,
  characterCharmList,
  huntSessionId,
}: HuntSessionViewProps) {
  const [unknownEntitiesModalOpen, setUnknownEntitiesModalOpen] = useState(false);
  const [unknownEntities, setUnknownEntities] = useState<HuntSessionUnknownEntities>(null);
  const [scanModal, setScanModal] = useState(false);
  const [tab, setTab] = useState(0);

  const { handleSubmit, formState } = useFormContext<HuntSessionForm>();

  const saveHuntSession = useSaveHuntSession();
  const onSubmit = handleSubmit((data) => saveHuntSession(data, huntSessionId));

  return (
    <Container maxWidth="xl">
      <SummaryStats
        setScanModal={() => setScanModal(true)}
        preyBonusList={preyBonusList}
        monsterList={monsterList}
      />

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          my: 2,
        }}
      >
        <Tab id="tab-0" aria-controls="tabpanel-0" label="Log Details" />
        <Tab id="tab-1" aria-controls="tabpanel-1" label="Damage" />
        <Tab id="tab-2" aria-controls="tabpanel-2" label="Supplies" />
        <Tab id="tab-3" aria-controls="tabpanel-3" label="Combat Stats" />
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
      <TabPanel value={tab} index={3}></TabPanel>

      <FloatingStatsPanel />

      <UnknownEntitiesModal
        open={unknownEntitiesModalOpen}
        unknownEntities={unknownEntities}
        onClose={() => setUnknownEntitiesModalOpen(false)}
      />

      <ScannerModal
        open={scanModal}
        onClose={() => setScanModal(false)}
        damageElementList={damageElementList}
        onApply={() => {
          console.log("log");
        }}
      />

      <FloatingActionButton
        visible={formState.isDirty}
        loading={formState.isSubmitting}
        onClick={onSubmit}
      >
        Save changes
      </FloatingActionButton>
    </Container>
  );
}
