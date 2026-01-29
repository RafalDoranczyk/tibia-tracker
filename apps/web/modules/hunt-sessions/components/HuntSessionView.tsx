"use client";

import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import { useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";

import { FloatingActionButton } from "@/components";
import type { HuntPlace } from "@/modules/hunt-places";

import { useSaveHuntSession } from "../hooks/useSaveHuntSession";
import type {
  DamageElement,
  HuntSession,
  HuntSessionFormValues,
  HuntSessionUnknownEntities,
  ItemPreview,
  MonsterPreview,
  SupplyItem,
} from "../types";
import { HuntSessionSummaryStats } from "./HuntSessionSummaryStats";
import { HuntSessionInputAnalyzer } from "./sections/HuntSessionInputAnalyzer";
import { HuntSessionLogDetails } from "./sections/HuntSessionLogDetails";
import { HuntSessionSuppliesAnalyzer } from "./sections/HuntSessionSuppliesAnalyzer";
import { UnknownEntitiesModal } from "./UnknownEntitiesModal";
import { UploadSessionModal } from "./UploadSessionModal";

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
  supplyList: SupplyItem[];
  damageElementList: DamageElement[];
  huntSession?: HuntSession | null;
};

export function HuntSessionView(props: HuntSessionViewProps) {
  const { monsterList, itemList, huntPlaceList, supplyList, damageElementList, huntSession } =
    props;

  const [isPending, startTransition] = useTransition();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [unknownEntitiesModalOpen, setUnknownEntitiesModalOpen] = useState(false);
  const [unknownEntities, setUnknownEntities] = useState<HuntSessionUnknownEntities>(null);
  const [tab, setTab] = useState(0);

  const { handleSubmit, formState } = useFormContext<HuntSessionFormValues>();

  const saveHuntSession = useSaveHuntSession(huntSession?.id);

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      await saveHuntSession(data);
    });
  });

  return (
    <Container maxWidth="lg">
      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 2,
        }}
      >
        <Tab label="Session" />
        <Tab label="Damage" />
        <Tab label="Supplies" />
      </Tabs>

      {/* Summary Stats */}
      <HuntSessionSummaryStats />

      <Divider sx={{ my: 2 }} />

      {/* Panels */}
      <TabPanel value={tab} index={0}>
        <HuntSessionLogDetails
          unknownEntities={unknownEntities}
          itemList={itemList}
          monsterList={monsterList}
          huntPlaceList={huntPlaceList}
          openUnknownEntitiesModal={() => setUnknownEntitiesModalOpen(true)}
          setOpen={setUploadModalOpen}
        />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <HuntSessionInputAnalyzer damageElementList={damageElementList} />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <HuntSessionSuppliesAnalyzer supplyList={supplyList} />
      </TabPanel>

      {/* Floating Save */}
      <FloatingActionButton visible={formState.isDirty} onClick={onSubmit} loading={isPending}>
        Save changes
      </FloatingActionButton>

      {/* Upload log modal */}
      <UploadSessionModal
        monsterList={monsterList}
        itemList={itemList}
        setUnknownEntities={setUnknownEntities}
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      {/* Unknown entities modal */}
      <UnknownEntitiesModal
        open={unknownEntitiesModalOpen}
        unknownEntities={unknownEntities}
        onClose={() => setUnknownEntitiesModalOpen(false)}
      />
    </Container>
  );
}
