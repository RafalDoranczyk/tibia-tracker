"use client";

import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { FloatingActionButton } from "@/components";
import type { HuntPlace } from "@/modules/hunt-places";

import { useSaveHuntSession } from "../hooks/useSaveHuntSession";
import type {
  DamageElement,
  HuntSession,
  HuntSessionForm,
  ItemPreview,
  MonsterPreview,
  PreyBonus,
} from "../schemas";
import type { HuntSessionUnknownEntities } from "../types";
import { DamageAnalyzer } from "./damage/DamageAnalyzer";
import { FloatingStatsPanel } from "./FloatingStatsPanel";
import { LogDetails } from "./log-details/LogDetails";
import { SummaryStats } from "./SummaryStats";
import { SuppliesAnalyzer } from "./supplies/SuppliesAnalyzer";
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
  huntSessionId?: HuntSession["id"];
};

export function HuntSessionView({
  monsterList,
  itemList,
  huntPlaceList,
  supplyList,
  damageElementList,
  preyBonusList,
  huntSessionId,
}: HuntSessionViewProps) {
  const [unknownEntitiesModalOpen, setUnknownEntitiesModalOpen] = useState(false);
  const [unknownEntities, setUnknownEntities] = useState<HuntSessionUnknownEntities>(null);
  const [tab, setTab] = useState(0);

  const { handleSubmit, formState } = useFormContext<HuntSessionForm>();
  const saveHuntSession = useSaveHuntSession();
  const onSubmit = handleSubmit((data) => saveHuntSession(data, huntSessionId));

  return (
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
        <Tab id="tab-1" aria-controls="tabpanel-1" label="Damage" />
        <Tab id="tab-2" aria-controls="tabpanel-2" label="Supplies" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      <TabPanel value={tab} index={0}>
        <LogDetails
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
        <DamageAnalyzer monsterList={monsterList} damageElementList={damageElementList} />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <SuppliesAnalyzer supplyList={supplyList} />
      </TabPanel>

      <FloatingStatsPanel />

      <FloatingActionButton
        visible={formState.isDirty}
        loading={formState.isSubmitting}
        onClick={onSubmit}
      >
        Save changes
      </FloatingActionButton>

      <UnknownEntitiesModal
        open={unknownEntitiesModalOpen}
        unknownEntities={unknownEntities}
        onClose={() => setUnknownEntitiesModalOpen(false)}
      />
    </Container>
  );
}
