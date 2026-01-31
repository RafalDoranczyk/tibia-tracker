"use client";

import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { TooltipIconButton } from "@/components";
import type { HuntPlace } from "@/modules/hunt-places";

import type {
  HuntSessionForm,
  HuntSessionUnknownEntities,
  ItemPreview,
  MonsterPreview,
  PreyBonus,
} from "../../types";
import { ComputedValuesDrawer } from "./ComputedValuesDrawer";
import { HuntSetup } from "./HuntSetup";
import { KilledMonsters } from "./KilledMonsters";
import { LootedItems } from "./LootedItems";
import { UploadLogModal } from "./UploadLogModal";

const SPACING = 2 as const;

function PaperCard({ children }: React.PropsWithChildren) {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100%",
        p: 2,
        background: "rgba(20,20,32,0.85)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </Paper>
  );
}

type LogDetailsProps = {
  preyBonusList: PreyBonus[];
  huntPlaceList: HuntPlace[];
  monsterList: MonsterPreview[];
  itemList: ItemPreview[];
  unknownEntities: HuntSessionUnknownEntities;
  openUnknownEntitiesModal: () => void;
  setUnknownEntities: (entities: HuntSessionUnknownEntities) => void;
};

export function LogDetails({
  preyBonusList,
  huntPlaceList,
  monsterList,
  itemList,
  unknownEntities,
  openUnknownEntitiesModal,
  setUnknownEntities,
}: LogDetailsProps) {
  const [computedStatOpen, setComputedStatOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { getValues } = useFormContext<HuntSessionForm>();

  const isAnyMonsterUnknown = (unknownEntities?.monsters?.length ?? 0) > 0;
  const isAnyItemUnknown = (unknownEntities?.items?.length ?? 0) > 0;

  // Get computed values that user can't edit tto determine if there is log data
  const hasSessionData = !!getValues("healing");

  return (
    <Stack spacing={SPACING}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <InvertColorsRounded color={hasSessionData ? "primary" : "secondary"} fontSize="small" />
        <Typography fontWeight={700}>Log data</Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack spacing={SPACING} direction="row" alignItems="center">
          {!hasSessionData && (
            <Typography variant="caption" textAlign="center" sx={{ opacity: 0.45, fontSize: 11 }}>
              Auto-fill from session log
            </Typography>
          )}

          <Button
            onClick={() => setUploadModalOpen(true)}
            variant={hasSessionData ? "outlined" : "contained"}
            color={hasSessionData ? "primary" : "secondary"}
            sx={{
              "@keyframes uploadPulse": {
                "0%": { boxShadow: "0 0 0 0 rgba(230,194,106,0.5)" },
                "70%": { boxShadow: "0 0 0 16px rgba(230,194,106,0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(230,194,106,0)" },
              },

              animation: !hasSessionData ? "uploadPulse 1.2s ease-out infinite" : "none",
            }}
          >
            Upload Session Log
          </Button>

          {hasSessionData && (
            <TooltipIconButton
              color="secondary"
              onClick={() => setComputedStatOpen(true)}
              variant="stats"
              title="Check Uploaded Stats"
            />
          )}
        </Stack>
      </Stack>

      <Divider />

      <Grid container spacing={SPACING}>
        <Grid size={{ xs: 12, xl: 2.5 }}>
          <PaperCard>
            <HuntSetup huntPlaceList={huntPlaceList} />
          </PaperCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4.75 }}>
          <PaperCard>
            <KilledMonsters
              preyBonusList={preyBonusList}
              monsterList={monsterList}
              isAnyMonsterUnknown={isAnyMonsterUnknown}
              openUnknownEntitiesModal={openUnknownEntitiesModal}
            />
          </PaperCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4.75 }}>
          <PaperCard>
            <LootedItems
              itemList={itemList}
              isAnyItemUnknown={isAnyItemUnknown}
              openUnknownEntitiesModal={openUnknownEntitiesModal}
            />
          </PaperCard>
        </Grid>
      </Grid>

      <ComputedValuesDrawer open={computedStatOpen} setOpen={setComputedStatOpen} />

      <UploadLogModal
        monsterList={monsterList}
        itemList={itemList}
        setUnknownEntities={setUnknownEntities}
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </Stack>
  );
}
