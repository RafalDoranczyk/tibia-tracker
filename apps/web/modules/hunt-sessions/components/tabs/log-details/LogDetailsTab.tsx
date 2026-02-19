"use client";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CharacterCharmDetailed } from "@/modules/charms";
import type { HuntPlace } from "@/modules/hunt-places";
import type { ItemPreview } from "@/modules/items";
import type { PreyBonus } from "@/modules/prey-bonus";
import type { HuntSessionForm, HuntSessionUnknownEntities, MonsterPreview } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";
import { HuntSetup } from "./HuntSetup";
import { KilledMonsters } from "./KilledMonsters";
import { LootedItems } from "./LootedItems";
import { UploadLogModal } from "./UploadLogModal";

const SPACING = 2 as const;

type LogDetailsTabProps = {
  preyBonusList: PreyBonus[];
  huntPlaceList: HuntPlace[];
  monsterList: MonsterPreview[];
  itemList: ItemPreview[];
  characterCharmList: CharacterCharmDetailed[];
  unknownEntities: HuntSessionUnknownEntities;
  openUnknownEntitiesModal: () => void;
  setUnknownEntities: (entities: HuntSessionUnknownEntities) => void;
};

export function LogDetailsTab({
  preyBonusList,
  huntPlaceList,
  monsterList,
  itemList,
  unknownEntities,
  characterCharmList,
  openUnknownEntitiesModal,
  setUnknownEntities,
}: LogDetailsTabProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { getValues } = useFormContext<HuntSessionForm>();

  const isAnyMonsterUnknown = (unknownEntities?.monsters?.length ?? 0) > 0;
  const isAnyItemUnknown = (unknownEntities?.items?.length ?? 0) > 0;

  // Get computed values that user can't edit tto determine if there is log data
  const hasSessionData = !!getValues("healing");

  return (
    <Stack spacing={SPACING}>
      <SectionHeader
        title="Log Data"
        icon={
          <InvertColorsRounded color={hasSessionData ? "primary" : "secondary"} fontSize="small" />
        }
      >
        <Box sx={{ flexGrow: 1 }} />

        <Stack spacing={SPACING} direction="row" alignItems="center">
          {!hasSessionData && (
            <>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", md: "block" }, alignSelf: "center" }}
              >
                Auto-fill from session log
              </Typography>

              <Button
                variant="outlined"
                size="small"
                startIcon={<FileUploadIcon />}
                onClick={() => setUploadModalOpen(true)}
              >
                Upload Log
              </Button>
            </>
          )}
        </Stack>
      </SectionHeader>

      <Grid container spacing={SPACING}>
        <Grid size={{ xs: 12, xl: 2.5 }}>
          <SectionPaperCard>
            <HuntSetup huntPlaceList={huntPlaceList} />
          </SectionPaperCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4.75 }}>
          <SectionPaperCard>
            <KilledMonsters
              characterCharmList={characterCharmList}
              preyBonusList={preyBonusList}
              monsterList={monsterList}
              isAnyMonsterUnknown={isAnyMonsterUnknown}
              openUnknownEntitiesModal={openUnknownEntitiesModal}
            />
          </SectionPaperCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4.75 }}>
          <SectionPaperCard>
            <LootedItems
              itemList={itemList}
              isAnyItemUnknown={isAnyItemUnknown}
              openUnknownEntitiesModal={openUnknownEntitiesModal}
            />
          </SectionPaperCard>
        </Grid>
      </Grid>

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
