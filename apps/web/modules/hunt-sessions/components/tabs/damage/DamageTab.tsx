import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { DamageElement } from "@/modules/damage-elements";
import { mapInputAnalyserToForm } from "../../../mappers/mapInputAnalyserToForm";
import type { HuntSessionForm, MonsterPreview } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { UploadLogButton } from "../UploadLogButton";
import { UploadLogModal } from "../UploadLogModal";
import { DamageElements } from "./DamageElements";
import { DamageSources } from "./DamageSources";

type DamageTabProps = {
  damageElementList: DamageElement[];
  monsterList: MonsterPreview[];
};

export function DamageTab({ damageElementList, monsterList }: DamageTabProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { getValues, setValue } = useFormContext<HuntSessionForm>();

  // Get computed values that user can't edit tto determine if there is log data
  const inputAnalyserdata = !!getValues("damage_elements").length;

  const handleImport = (json: string) => {
    try {
      const { damageElements, monsterDamageSources } = mapInputAnalyserToForm(
        damageElementList,
        monsterList,
        json
      );
      setValue("damage_elements", damageElements);
      setValue("monster_damage_sources", monsterDamageSources);

      return null;
    } catch {
      return "Invalid session format.";
    }
  };

  return (
    <Stack spacing={2}>
      <SectionHeader
        title="Input Analyser"
        icon={<InvertColorsRounded color="secondary" fontSize="small" />}
        action={
          <UploadLogButton isSuccess={!!inputAnalyserdata} onClick={() => setUploadModalOpen(true)}>
            {inputAnalyserdata ? "Analyser Data Loaded" : "Upload log"}
          </UploadLogButton>
        }
      />

      <Grid container direction={{ xs: "column", md: "row" }} spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DamageElements damageElementList={damageElementList} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DamageSources monsterList={monsterList} />
        </Grid>
      </Grid>

      <UploadLogModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Paste Your Input Analyser Log"
        placeholder="Paste Input Analyser text log here..."
        onImport={handleImport}
      />
    </Stack>
  );
}
