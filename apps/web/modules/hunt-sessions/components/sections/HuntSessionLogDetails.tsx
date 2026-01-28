import BugReportOutlined from "@mui/icons-material/BugReportOutlined";
import { Avatar, Box, Button, Divider, Fade, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ControlledSelect, ControlledTextField } from "@/components";
import type { HuntPlace } from "@/modules/hunt-places";

import { HUNT_SESSION_PLAYER_OPTIONS } from "../../constants";
import type { HuntSessionFormValues, MonsterCount, MonsterPreview } from "../../types";
import { UploadSessionModal } from "../UploadSessionModal";
import { HuntSessionSection } from "./HuntSessionSection";

const SPACING = 2 as const;

type MonsterListProps = {
  monsterList: MonsterPreview[];
  monsters: MonsterCount[];
};

function MonsterList({ monsterList, monsters }: MonsterListProps) {
  const monsterMap = useMemo(
    () => new Map(monsterList.map((m) => [m.name.toLowerCase(), m])),
    [monsterList]
  );

  return (
    <Stack mt={SPACING} spacing={1}>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={1}>
        {monsters.slice().map((m) => {
          const monsterData = monsterMap.get(m.name.toLowerCase());
          return (
            <Stack
              key={m.name.toLowerCase()}
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                background: (t) => t.palette.primary.dark,
                color: (t) => t.palette.getContrastText(t.palette.primary.dark),
                borderRadius: 2,
                p: 1,
                transition: "transform 0.1s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Avatar
                src={monsterData?.image_url}
                alt=""
                sx={{ width: 40, height: 40, flexShrink: 0 }}
              />

              <Box flex={1} minWidth={0}>
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  variant="caption"
                  fontWeight="bold"
                  noWrap
                  display="block"
                >
                  {m.name}
                </Typography>
              </Box>

              <Typography variant="body2" fontWeight="900" sx={{ flexShrink: 0, opacity: 0.9 }}>
                ×{m.count}
              </Typography>
            </Stack>
          );
        })}
      </Box>
    </Stack>
  );
}

type HuntSessionLogDetailsProps = {
  huntPlaceList: HuntPlace[];
  monsterList: MonsterPreview[];
  isHuntSession: boolean;
  monsters: MonsterCount[];
};

export function HuntSessionLogDetails({
  huntPlaceList,
  monsterList,
  isHuntSession,
  monsters,
}: HuntSessionLogDetailsProps) {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext<HuntSessionFormValues>();

  const isBtnDisabled = isHuntSession;
  const isBtnVisible = !(isHuntSession || monsters.length > 0);

  return (
    <Tooltip
      slots={{
        transition: Fade,
      }}
      slotProps={{
        transition: { timeout: 400 },
      }}
      placement="top-end"
      title="Upload a session log to auto-fill the form"
      arrow
      open={isBtnVisible}
    >
      <div>
        <HuntSessionSection isRequired title="Session Details">
          <Stack spacing={SPACING}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center">
              <Button
                disabled={isBtnDisabled}
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
              >
                Upload Session Log
              </Button>
            </Stack>

            <Stack direction="row" spacing={SPACING}>
              <ControlledSelect
                label="Hunt Place"
                name="place_id"
                control={control}
                options={huntPlaceList}
              />

              <ControlledTextField control={control} name="date" type="date" label="Date" />
            </Stack>

            <Stack direction={{ xs: "column", xl: "row" }} spacing={SPACING}>
              <ControlledSelect
                label="Player count"
                name="player_count"
                control={control}
                options={HUNT_SESSION_PLAYER_OPTIONS}
              />

              <ControlledTextField
                control={control}
                name="level"
                type="number"
                label="Level"
                fullWidth
              />

              <ControlledTextField control={control} name="minutes" type="number" label="Minutes" />
            </Stack>

            <Stack direction={{ xs: "column", xl: "row" }} spacing={SPACING}>
              <ControlledTextField
                control={control}
                name="balance"
                type="number"
                label="Balance"
                fullWidth
              />

              <ControlledTextField
                control={control}
                name="raw_xp_gain"
                type="number"
                label="Raw XP Gain"
                fullWidth
              />

              <ControlledTextField
                control={control}
                name="xp_gain"
                type="number"
                label="XP Gain"
                fullWidth
              />
            </Stack>

            <div>
              <Stack direction="row" alignItems="center" gap={1} mb={1}>
                <BugReportOutlined fontSize="small" color="success" />
                <Typography variant="subtitle2" fontWeight="bold">
                  Killed Monsters
                </Typography>
              </Stack>
              <Divider flexItem />

              {monsters.length === 0 ? (
                <Typography mt={2} variant="body2" color="text.secondary">
                  Monsters killed will be displayed here once you add them to the session log.
                </Typography>
              ) : (
                <MonsterList monsters={monsters} monsterList={monsterList} />
              )}
            </div>
          </Stack>

          <UploadSessionModal
            monsterList={monsterList}
            open={open}
            onClose={() => setOpen(false)}
          />
        </HuntSessionSection>
      </div>
    </Tooltip>
  );
}
