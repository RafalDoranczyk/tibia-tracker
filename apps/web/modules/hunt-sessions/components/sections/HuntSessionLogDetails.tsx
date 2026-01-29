import BugReportOutlined from "@mui/icons-material/BugReportOutlined";
import Inventory2 from "@mui/icons-material/Inventory2";
import InvertColorsRounded from "@mui/icons-material/InventoryTwoTone";
import { Avatar, Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { ControlledSelect, ControlledTextField } from "@/components";
import type { HuntPlace } from "@/modules/hunt-places";

import { HUNT_SESSION_PLAYER_OPTIONS } from "../../constants";
import type {
  HuntSessionFormValues,
  HuntSessionUnknownEntities,
  ItemPreview,
  MonsterPreview,
} from "../../types";

const SPACING = 2 as const;

type CatalogEntity = {
  id: number;
  name: string;
  image_path?: string | null;
};

type CountEntity = {
  name: string;
  count: number;
};

type EntityCountGridProps<TCount extends CountEntity, TCatalog extends CatalogEntity> = {
  entities: TCount[];
  catalog: TCatalog[];
};

function EntityCountGrid<TCount extends CountEntity, TCatalog extends CatalogEntity>({
  entities,
  catalog,
}: EntityCountGridProps<TCount, TCatalog>) {
  const catalogMap = useMemo(
    () => new Map(catalog.map((e) => [e.name.toLowerCase(), e])),
    [catalog]
  );

  return (
    <Stack spacing={1}>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))" gap={1}>
        {entities
          .slice()
          .sort((a, b) => b.count - a.count)
          .map((e) => {
            const catalogData = catalogMap.get(e.name.toLowerCase());

            return (
              <Stack
                key={e.name.toLowerCase()}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  background: (t) => t.palette.background.paper,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Avatar
                  src={catalogData?.image_path ?? undefined}
                  alt=""
                  sx={{ width: 32, height: 32 }}
                >
                  {!catalogData?.image_path && e.name[0]?.toUpperCase()}
                </Avatar>

                <Box flex={1} minWidth={0}>
                  <Typography
                    sx={{ textTransform: "capitalize" }}
                    variant="caption"
                    fontWeight="bold"
                    noWrap
                  >
                    {e.name}
                  </Typography>
                </Box>

                <Typography variant="body2" fontWeight={700}>
                  ×{e.count}
                </Typography>
              </Stack>
            );
          })}
      </Box>
    </Stack>
  );
}

const computedFields: readonly {
  name: keyof HuntSessionFormValues;
  label: string;
  type: string;
}[] = [
  { name: "profit", label: "Balance", type: "number" },
  { name: "raw_xp_gain", label: "Raw XP Gain", type: "number" },
  { name: "xp_gain", label: "XP Gain", type: "number" },
  { name: "date", label: "Date", type: "date" },
  { name: "duration_seconds", label: "Duration seconds", type: "number" },
  { name: "damage", label: "Damage", type: "number" },
  { name: "healing", label: "Healing", type: "number" },
  { name: "loot_value", label: "Loot Value", type: "number" },
  { name: "supplies_cost", label: "Supplies Cost", type: "number" },
] as const;

type HuntSessionLogDetailsProps = {
  huntPlaceList: HuntPlace[];
  monsterList: MonsterPreview[];
  itemList: ItemPreview[];
  unknownEntities: HuntSessionUnknownEntities;
  openUnknownEntitiesModal: () => void;
  setOpen: (open: boolean) => void;
};

export function HuntSessionLogDetails({
  huntPlaceList,
  monsterList,
  itemList,
  unknownEntities,
  openUnknownEntitiesModal,
  setOpen,
}: HuntSessionLogDetailsProps) {
  const { control, watch } = useFormContext<HuntSessionFormValues>();
  const { monsters, items } = watch();

  const isAnyMonsterUnknown = unknownEntities && unknownEntities.monsters.length > 0;
  const isAnyItemUnknown = unknownEntities && unknownEntities.items.length > 0;

  return (
    <Stack spacing={SPACING}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <InvertColorsRounded color="secondary" fontSize="small" />
        <Typography fontWeight={700}>Log data</Typography>

        {/* spacer */}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="contained" color="secondary" size="small" onClick={() => setOpen(true)}>
          Upload Session Log
        </Button>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" color="text.secondary">
        Upload a session log from the packages Tibia folder to automatically fill in the data below.
      </Typography>

      <Box display="grid" gridTemplateColumns={{ xs: "1fr", xl: "2fr 1fr" }} gap={4}>
        {/* ================= LEFT: FORM ================= */}
        <Stack spacing={SPACING} maxWidth={900}>
          <Typography fontWeight={700}>Computed Values</Typography>

          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))" gap={2}>
            {computedFields.map((f) => (
              <ControlledTextField
                key={f.name}
                control={control}
                name={f.name}
                label={f.label}
                type={f.type}
                size="small"
                disabled
              />
            ))}
          </Box>

          <Typography fontWeight={700}>Basic Values</Typography>

          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))" gap={2}>
            <ControlledSelect
              label="Player count"
              name="player_count"
              control={control}
              options={HUNT_SESSION_PLAYER_OPTIONS}
            />

            <ControlledTextField control={control} name="level" type="number" label="Level" />

            <ControlledSelect
              label="Hunt Place"
              name="place_id"
              control={control}
              options={huntPlaceList}
            />
          </Box>
        </Stack>

        {/* ================= RIGHT: SIDEBAR ================= */}
        <Stack spacing={SPACING} sx={{ position: "sticky", top: 96, height: "fit-content" }}>
          {/* Monsters Panel */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <BugReportOutlined fontSize="small" color="primary" />
                <Typography variant="subtitle2" fontWeight={700}>
                  Killed Monsters
                </Typography>
              </Stack>
              <Divider />

              {isAnyMonsterUnknown && (
                <Button
                  size="small"
                  variant="text"
                  onClick={openUnknownEntitiesModal}
                  color="error"
                >
                  Some monsters are unknown and cannot be stored in the database.
                </Button>
              )}

              {monsters.length === 0 ? (
                <Typography mt={1} variant="body2" color="text.secondary">
                  No monsters tracked yet.
                </Typography>
              ) : (
                <EntityCountGrid entities={monsters} catalog={monsterList} />
              )}
            </Stack>
          </Paper>

          {/* Loot Panel */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Inventory2 fontSize="small" color="primary" />
                <Typography variant="subtitle2" fontWeight={700}>
                  Looted Items
                </Typography>
              </Stack>

              <Divider />

              {isAnyItemUnknown && (
                <Button
                  size="small"
                  variant="text"
                  onClick={openUnknownEntitiesModal}
                  color="error"
                >
                  Some items are unknown and cannot be stored in the database.
                </Button>
              )}

              {items.length === 0 ? (
                <Typography mt={1} variant="body2" color="text.secondary">
                  No loot tracked yet.
                </Typography>
              ) : (
                <EntityCountGrid entities={items} catalog={itemList} />
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Stack>
  );
}
