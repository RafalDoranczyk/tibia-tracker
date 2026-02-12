import {
  Avatar,
  Chip,
  type ChipProps,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { getPublicAssetUrl } from "@/core/supabase";
import type { CharacterCharmDetailed, CharmType } from "@/modules/charms";

const CHARM_COLOR_MAP: Record<CharmType, ChipProps["color"]> = {
  major: "primary",
  minor: "secondary",
} as const;

type CharmChipEditorProps = {
  value?: number | null; // charmBonusId
  characterCharmList: CharacterCharmDetailed[];
  onChange: (charmBonusId: number | null) => void;
};

export function CharmChipEditor({ characterCharmList, value, onChange }: CharmChipEditorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selected = characterCharmList.find((b) => b.charm_id === value);

  const isCharmListEmpty = characterCharmList.length === 0;

  return (
    <>
      <Tooltip title={isCharmListEmpty ? "No charms available" : undefined}>
        <span>
          <Chip
            disabled={isCharmListEmpty}
            size="small"
            variant={selected ? "filled" : "outlined"}
            label={selected ? selected.charm.name : "+ Charm"}
            color={selected ? CHARM_COLOR_MAP[selected.charm.type] : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        </span>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        {characterCharmList.map(({ charm_id, charm }) => (
          <MenuItem
            key={charm_id}
            dense
            onClick={() => {
              onChange(charm_id);
              setAnchorEl(null);
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={getPublicAssetUrl(charm.image_path)} sx={{ width: 16, height: 16 }} />
              <Typography variant="caption" color="text.secondary">
                {charm.name.toUpperCase()}
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
          ✕ Remove charm bonus
        </MenuItem>
      </Menu>
    </>
  );
}
