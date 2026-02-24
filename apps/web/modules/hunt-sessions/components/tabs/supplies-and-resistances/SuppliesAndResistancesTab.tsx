import HealthAndSafety from "@mui/icons-material/HealthAndSafety";
import { Grid, Stack } from "@mui/material";
import type { DamageElement } from "@/modules/damage-elements";
import type { ItemPreview } from "@/modules/items";
import { SectionHeader } from "../SectionHeader";
import { ResistancesAnalyser } from "./ResistancesAnalyser";
import { SupplyAnalyser } from "./SupplyAnalyser";

type SuppliesAndResistancesTabProps = {
  supplyList: ItemPreview[];
  damageElementList: DamageElement[];
};

export function SuppliesAndResistancesTab({
  supplyList,
  damageElementList,
}: SuppliesAndResistancesTabProps) {
  return (
    <Stack spacing={2}>
      <SectionHeader
        title="Supplies And Resistances"
        icon={<HealthAndSafety color="secondary" fontSize="small" />}
      />
      <Grid container direction={{ xs: "column", md: "row" }} spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SupplyAnalyser supplyList={supplyList} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ResistancesAnalyser damageElementList={damageElementList} />
        </Grid>
      </Grid>
    </Stack>
  );
}
