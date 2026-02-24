"use client";

import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CharacterCharmDetailed } from "@/modules/charms";
import type { HuntPlace } from "@/modules/hunt-places";
import type { ItemPreview } from "@/modules/items";
import type { PreyBonus } from "@/modules/prey-bonus";
import { mapHuntSessionJSONToForm } from "../../../mappers/mapHuntSessionJSONToForm";
import { HuntSessionParseError } from "../../../parsers/parseHuntSessionJSON";
import type { HuntSessionForm, HuntSessionUnknownEntities, MonsterPreview } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";
import { UploadLogButton } from "../UploadLogButton";
import { UploadLogModal } from "../UploadLogModal";
import { HuntSetup } from "./HuntSetup";
import { KilledMonsters } from "./KilledMonsters";
import { LootedItems } from "./LootedItems";

function patchFormValues<T extends Record<string, unknown>>(
  values: T,
  setValue: (name: keyof T, value: T[keyof T], options?: { shouldDirty?: boolean }) => void
) {
  for (const key of Object.keys(values) as (keyof T)[]) {
    setValue(key, values[key], { shouldDirty: true });
  }
}

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
  const { getValues, setValue } = useFormContext<HuntSessionForm>();

  const isAnyMonsterUnknown = (unknownEntities?.monsters?.length ?? 0) > 0;
  const isAnyItemUnknown = (unknownEntities?.items?.length ?? 0) > 0;

  // Get computed values that user can't edit tto determine if there is log data
  const hasSessionData = !!getValues("healing");

  const handleImport = (text: string) => {
    try {
      const { formValues, unknown } = mapHuntSessionJSONToForm({
        json: text,
        monsterList,
        itemList,
      });

      patchFormValues(formValues, (name, value) => setValue(name, value, { shouldDirty: true }));
      setUnknownEntities(unknown);

      return null;
    } catch (err) {
      if (err instanceof HuntSessionParseError) {
        return `Missing fields: ${err.missingFields.join(", ")}`;
      }
      return "Invalid session format.";
    }
  };

  return (
    <Stack spacing={SPACING}>
      <SectionHeader
        title="Hunt Session Log"
        icon={<InvertColorsRounded color="secondary" fontSize="small" />}
        action={
          <UploadLogButton isSuccess={!!hasSessionData} onClick={() => setUploadModalOpen(true)}>
            {hasSessionData ? "Analyser Data Loaded" : "Upload Session Log"}
          </UploadLogButton>
        }
      />

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
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Hunt Session Log"
        placeholder="Paste JSON session log here..."
        onImport={handleImport}
      />
    </Stack>
  );
}
