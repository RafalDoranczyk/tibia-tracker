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
  HuntSessionUnknownEntities,
  ItemPreview,
  MonsterPreview,
  PreyBonus,
} from "../types";
import { DamageAnalyzer } from "./damage/DamageAnalyzer";
import { LogDetails } from "./log-details/LogDetails";
import { SummaryStats } from "./SummaryStats";
import { SuppliesAnalyzer } from "./supplies/SuppliesAnalyzer";
import { UnknownEntitiesModal } from "./UnknownEntitiesModal";

function TabPanel({
  value,
  index,
  children,
}: React.PropsWithChildren<{ value: number; index: number }>) {
  return <Box sx={{ display: value === index ? "block" : "none" }}>{children}</Box>;
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
        <Tab label="Log Details" />
        <Tab label="Damage" />
        <Tab label="Supplies" />
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
