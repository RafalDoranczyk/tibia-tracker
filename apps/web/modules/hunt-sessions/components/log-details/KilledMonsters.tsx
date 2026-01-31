import BugReportOutlined from "@mui/icons-material/BugReportOutlined";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { EmptyState } from "@/components";

import type { HuntSessionForm, MonsterPreview, PreyBonus } from "../../types";

type PreyChipEditorProps = {
  value?: number | null; // preyBonusId
  preyBonusList: PreyBonus[];
  onChange: (preyBonusId: number | null) => void;
};

function PreyChipEditor({ value, preyBonusList, onChange }: PreyChipEditorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selected = preyBonusList.find((b) => String(b.id) === String(value));

  return (
    <>
      <Chip
        size="small"
        variant={selected ? "filled" : "outlined"}
        label={selected ? `${selected.bonus_value}% ${selected.bonus_type}` : "+ Prey"}
        color={
          selected?.bonus_type === "damage"
            ? "error"
            : selected?.bonus_type === "loot"
              ? "warning"
              : selected?.bonus_type === "exp"
                ? "secondary"
                : "default"
        }
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          height: 22,
          fontSize: 12,
          px: 0.5,
          cursor: "pointer",
          "& .MuiChip-label": { px: 0.75 },
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            minWidth: 180,
            borderRadius: 1.5,
          },
        }}
      >
        {preyBonusList.map((b) => (
          <MenuItem
            key={b.id}
            dense
            onClick={() => {
              onChange(b.id);
              setAnchorEl(null);
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontSize={13} fontWeight={600}>
                {b.bonus_value}%
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                {b.bonus_type.toUpperCase()}
              </Typography>
            </Stack>
          </MenuItem>
        ))}

        <Divider />

        {/* Pretty Clear */}
        <MenuItem
          dense
          onClick={() => {
            onChange(null);
            setAnchorEl(null);
          }}
          sx={{
            color: "text.secondary",
            fontSize: 12,
            display: "flex",
            justifyContent: "center",
          }}
        >
          ✕ Remove prey bonus
        </MenuItem>
      </Menu>
    </>
  );
}

type KilledMonstersProps = {
  preyBonusList: PreyBonus[];
  monsterList: MonsterPreview[];
  isAnyMonsterUnknown: boolean;
  openUnknownEntitiesModal: () => void;
};

export function KilledMonsters({
  preyBonusList,
  monsterList,
  isAnyMonsterUnknown,
  openUnknownEntitiesModal,
}: KilledMonstersProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields } = useFieldArray({
    control,
    name: "killed_monsters",
  });

  const monsterMap = useMemo(() => new Map(monsterList.map((m) => [m.id, m])), [monsterList]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <BugReportOutlined fontSize="small" color="primary" />
        <Typography fontWeight={700}>Killed Monsters</Typography>
      </Stack>

      <Divider />

      {isAnyMonsterUnknown && (
        <Button size="small" color="error" onClick={openUnknownEntitiesModal}>
          Some monsters are unknown
        </Button>
      )}

      {fields.length === 0 ? (
        <EmptyState size="small" variant="monsters" title="No monsters tracked yet" />
      ) : (
        <Stack spacing={1}>
          {fields.map((field, index) => {
            const monster = monsterMap.get(field.monsterId);

            return (
              <Stack
                key={field.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: 1,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                {/* LEFT */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar src={monster?.image_path} sx={{ width: 28, height: 28 }} />
                  <Box>
                    <Typography fontWeight={600}>
                      {monster?.name ?? `Unknown #${field.monsterId}`}
                    </Typography>
                    <Typography variant="caption">×{field.count}</Typography>
                  </Box>
                </Stack>

                {/* RIGHT */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Controller
                    control={control}
                    name={`killed_monsters.${index}.preyBonusId`}
                    render={({ field }) => (
                      <PreyChipEditor
                        value={field.value}
                        preyBonusList={preyBonusList}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
