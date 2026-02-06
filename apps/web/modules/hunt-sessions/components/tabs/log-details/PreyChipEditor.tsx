import { Chip, type ChipProps, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";

import type { PreyBonus } from "../../../schemas";

type PreyChipEditorProps = {
  value?: number | null; // preyBonusId
  preyBonusList: PreyBonus[];
  onChange: (preyBonusId: number | null) => void;
};

const PREY_COLOR_MAP: Record<PreyBonus["bonus_type"], ChipProps["color"]> = {
  damage: "error",
  damage_reduction: "info",
  loot: "warning",
  exp: "secondary",
} as const;

export function PreyChipEditor({ value, preyBonusList, onChange }: PreyChipEditorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selected = preyBonusList.find((b) => String(b.id) === String(value));

  return (
    <>
      <Chip
        size="small"
        variant={selected ? "filled" : "outlined"}
        label={selected ? `${selected.bonus_value}% ${selected.bonus_type}` : "+ Prey"}
        color={selected ? PREY_COLOR_MAP[selected.bonus_type] : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
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
              <Typography variant="caption">{b.bonus_value}%</Typography>
              <Typography variant="caption" color="text.secondary">
                {b.bonus_type.toUpperCase()}
              </Typography>
            </Stack>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem
          dense
          onClick={() => {
            onChange(null);
            setAnchorEl(null);
          }}
        >
          ✕ Remove prey bonus
        </MenuItem>
      </Menu>
    </>
  );
}
