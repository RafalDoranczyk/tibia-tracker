"use client";

import {
  Avatar,
  alpha,
  Box,
  Card,
  CardContent,
  Divider,
  Fade,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { getPublicAssetUrl } from "@/core/assets";
import { formatNumberCompact } from "@/utils";
import type { HuntSpotAnalytics } from "../schemas";
import { calculateTimeToNextLevel, calculateTotalExp, sortMonstersByExp } from "../utils";

// 3 Prey is just max in the game, so it makes sense to limit the selection to that
const MAX_PREY_SELECTION = 3;
const HUNT_SPOT_CONFIDENCE = 5;
const HUNT_SPOT_CONFIDENCE_THRESHOLD = HUNT_SPOT_CONFIDENCE * 2;

type Highlight = "xp" | "profit";

type SpotCardProps = {
  stats: HuntSpotAnalytics;
  highlight?: Highlight;
  xpToNextLevel: number;
  currentMultiplier: number;
};

export function SpotCard({ stats, highlight, xpToNextLevel, currentMultiplier }: SpotCardProps) {
  const {
    avg_profit_h,
    avg_monsters_per_hour,
    avg_raw_xp_h,
    place_image_path,
    place_name,
    sessions_analyzed,
  } = stats;

  const [selectedPrey, setSelectedPrey] = useState<number[]>([]);
  const isProfit = avg_profit_h > 0;

  const handlePreyChange = (_: React.MouseEvent<HTMLElement>, newPrey: number[]) => {
    if (newPrey.length <= MAX_PREY_SELECTION) setSelectedPrey(newPrey);
  };

  const sortedMonsters = useMemo(
    () => sortMonstersByExp(avg_monsters_per_hour, currentMultiplier),
    [avg_monsters_per_hour, currentMultiplier]
  );

  const totalExp = useMemo(
    () => calculateTotalExp(sortedMonsters, selectedPrey, avg_raw_xp_h, currentMultiplier),
    [sortedMonsters, selectedPrey, avg_raw_xp_h, currentMultiplier]
  );

  const timeToNextLevel = useMemo(
    () => calculateTimeToNextLevel(xpToNextLevel, totalExp),
    [xpToNextLevel, totalExp]
  );

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
        },
        ...(highlight && {
          border: (theme) =>
            `1px solid ${alpha(theme.palette[highlight === "xp" ? "primary" : "secondary"].main, 0.4)}`,
          boxShadow: (theme) =>
            `0 0 15px -5px ${alpha(theme.palette[highlight === "xp" ? "primary" : "secondary"].main, 0.3)}`,
        }),
      }}
    >
      {highlight && <BadgeHighlight highlight={highlight} />}

      <CardContent>
        <CardHeader
          place_image_path={place_image_path}
          place_name={place_name}
          sessions_analyzed={sessions_analyzed}
        />
        <EstimatedXpBox totalExp={totalExp} />
        <SecondaryStats
          avg_raw_xp_h={avg_raw_xp_h}
          avg_profit_h={avg_profit_h}
          isProfit={isProfit}
        />
        <XpPreys
          selectedPrey={selectedPrey}
          handlePreyChange={handlePreyChange}
          sortedMonsters={sortedMonsters}
        />
      </CardContent>

      {timeToNextLevel && <CardFooter timeToNextLevel={timeToNextLevel} />}
    </Card>
  );
}

function CardHeader({
  place_image_path,
  place_name,
  sessions_analyzed,
}: {
  place_image_path: string;
  place_name: string;
  sessions_analyzed: number;
}) {
  const confidenceScore = Math.min(Math.ceil(sessions_analyzed / 2), HUNT_SPOT_CONFIDENCE);
  const isHighConfidence = sessions_analyzed >= HUNT_SPOT_CONFIDENCE_THRESHOLD;

  return (
    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
      <Avatar
        src={getPublicAssetUrl(place_image_path)}
        variant="rounded"
        sx={{ width: 48, height: 48, boxShadow: 2, p: 0.5 }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" fontWeight={800} noWrap>
          {place_name}
        </Typography>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <Stack direction="row" spacing={0.3}>
            {[...Array(HUNT_SPOT_CONFIDENCE)].map((_, i) => (
              <Box
                // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
                key={i}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor:
                    i < confidenceScore
                      ? isHighConfidence
                        ? "success.main"
                        : "secondary.main"
                      : "action.disabledBackground",
                  transition: "0.3s",
                }}
              />
            ))}
          </Stack>

          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              fontWeight: 700,
              fontSize: "0.6rem",
              ml: 0.5,
              lineHeight: 1,
            }}
          >
            {sessions_analyzed} {sessions_analyzed === 1 ? "session" : "sessions"}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

function BadgeHighlight({ highlight }: { highlight: Highlight }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        bgcolor: highlight === "xp" ? "primary.main" : "secondary.main",
        color: (t) =>
          t.palette.getContrastText(t.palette[highlight === "xp" ? "primary" : "secondary"].main),
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 900,
        fontSize: "0.6rem",
        letterSpacing: 1,
      }}
    >
      TOP {highlight.toUpperCase()}
    </Box>
  );
}

function EstimatedXpBox({ totalExp }: { totalExp: number }) {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2.5,
        borderRadius: 2,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
        border: (theme) => `1px dashed ${alpha(theme.palette.divider, 1)}`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Fade in={true} key={totalExp} timeout={600}>
        <Typography
          variant="h4"
          color="secondary.main"
          fontWeight={900}
          sx={{ fontFamily: "monospace" }}
        >
          {formatNumberCompact(totalExp)}
        </Typography>
      </Fade>

      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ fontWeight: 800, letterSpacing: 1.5 }}
      >
        Estimated XP/H
      </Typography>
    </Box>
  );
}
function SecondaryStats({
  avg_raw_xp_h,
  avg_profit_h,
  isProfit,
}: {
  avg_raw_xp_h: number;
  avg_profit_h: number;
  isProfit: boolean;
}) {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem sx={{ my: 1 }} />}
      spacing={2}
      mb={3}
    >
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography variant="body1" color="text.primary" fontWeight={800}>
          {formatNumberCompact(avg_raw_xp_h)}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 700, display: "block" }}
        >
          RAW XP/H
        </Typography>
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography
          variant="body1"
          fontWeight={800}
          color={isProfit ? "success.main" : "error.main"}
        >
          {isProfit ? "+" : ""}
          {formatNumberCompact(avg_profit_h)}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 700, display: "block" }}
        >
          PROFIT/H
        </Typography>
      </Box>
    </Stack>
  );
}

function XpPreys({
  selectedPrey,
  handlePreyChange,
  sortedMonsters,
}: {
  selectedPrey: number[];
  sortedMonsters: ReturnType<typeof sortMonstersByExp>;
  handlePreyChange: (event: React.MouseEvent<HTMLElement>, newPrey: number[]) => void;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        display="block"
        color="text.secondary"
        mb={1}
        sx={{ fontWeight: 900, textTransform: "uppercase", letterSpacing: 1 }}
      >
        Add XP Bonus (+40%)
      </Typography>

      <ToggleButtonGroup
        value={selectedPrey}
        onChange={handlePreyChange}
        fullWidth
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 1,

          "& .MuiToggleButton-root": {
            flexDirection: "row",
            justifyContent: "flex-start",
            py: 1,
            px: 1,
            gap: 1.5,
            border: (theme) => `1px solid ${theme.palette.divider} !important`,
            borderRadius: "8px !important",
            transition: "0.2s",
            "&.Mui-selected": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              borderColor: "primary.main !important",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
              },
            },
          },
        }}
      >
        {sortedMonsters.map(({ monster_id, monster_name, image_url, preyBonusExp }) => (
          <ToggleButton key={monster_id} value={monster_id}>
            <Avatar
              src={image_url}
              variant="square"
              sx={{ width: 32, height: 32, flexShrink: 0 }}
            />
            <Box sx={{ textAlign: "left", minWidth: 0 }}>
              <Typography
                variant="caption"
                fontWeight={800}
                sx={{
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {monster_name}
              </Typography>
              <Typography
                variant="caption"
                color="success.main"
                fontWeight={700}
                sx={{ fontSize: "0.85rem", display: "block" }}
              >
                +{formatNumberCompact(Math.round(preyBonusExp))}
              </Typography>
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

function CardFooter({ timeToNextLevel }: { timeToNextLevel: string }) {
  return (
    <Stack
      mt="auto"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 1.5,
        px: 2,
        bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.05),
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="caption"
        fontWeight={900}
        color="secondary.main"
        sx={{ textTransform: "uppercase" }}
      >
        Next Lvl ETA
      </Typography>
      <Typography
        variant="subtitle2"
        fontWeight={900}
        color="secondary.main"
        sx={{ fontFamily: "monospace" }}
      >
        {timeToNextLevel}
      </Typography>
    </Stack>
  );
}
