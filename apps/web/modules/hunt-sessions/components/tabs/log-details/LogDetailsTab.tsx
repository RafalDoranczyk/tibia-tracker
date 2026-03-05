"use client";

import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Box, Grid } from "@mui/material";
import type { CharacterCharmDetailed } from "@repo/database/character-charms";
import type { HuntPlace } from "@repo/database/hunt-places";
import type { MonsterPreview } from "@repo/database/hunt-sessions";
import type { ItemPreview } from "@repo/database/items";
import type { PreyBonus } from "@repo/database/prey-bonuses";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { mapHuntSessionJSONToForm } from "../../../mappers/mapHuntSessionJSONToForm";
import { HuntSessionParseError } from "../../../parsers/parseHuntSessionJSON";
import type { HuntSessionForm } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
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
};

export function LogDetailsTab({
  preyBonusList,
  huntPlaceList,
  monsterList,
  itemList,
  characterCharmList,
}: LogDetailsTabProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { getValues, setValue } = useFormContext<HuntSessionForm>();

  // Get computed values that user can't edit tto determine if there is log data
  const hasSessionData = !!getValues("healing");

  const handleImport = (text: string) => {
    try {
      const { formValues } = mapHuntSessionJSONToForm({
        json: text,
        monsterList,
        itemList,
      });

      patchFormValues(formValues, (name, value) => setValue(name, value, { shouldDirty: true }));

      return null;
    } catch (err) {
      if (err instanceof HuntSessionParseError) {
        return `Missing fields: ${err.missingFields.join(", ")}`;
      }
      return "Invalid session format.";
    }
  };

  return (
    <Box>
      <SectionHeader
        title="Hunt Session Log"
        icon={<InvertColorsRounded color="secondary" fontSize="small" />}
        description="Detailed information about the hunt session that can be imported from a JSON log file. You can export this log from the Input Analyser after your hunt session by going to 'Hunt Analyser' and clicking 'Copy To Clipboard'."
        action={
          <UploadLogButton isSuccess={!!hasSessionData} onClick={() => setUploadModalOpen(true)}>
            {hasSessionData ? "Analyser Data Loaded" : "Upload Session Log"}
          </UploadLogButton>
        }
      />

      <Grid container spacing={SPACING}>
        <Grid size={{ xs: 12, xl: 2.5 }}>
          <HuntSetup huntPlaceList={huntPlaceList} />
        </Grid>

        <Grid size={{ xs: 12, xl: 4.75 }}>
          <KilledMonsters
            characterCharmList={characterCharmList}
            preyBonusList={preyBonusList}
            monsterList={monsterList}
          />
        </Grid>

        <Grid size={{ xs: 12, xl: 4.75 }}>
          <LootedItems itemList={itemList} />
        </Grid>
      </Grid>

      <UploadLogModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Hunt Session Log"
        placeholder="Paste JSON session log here..."
        onImport={handleImport}
      />
    </Box>
  );
}
