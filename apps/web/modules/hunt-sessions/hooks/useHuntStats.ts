import { useFormContext, useWatch } from "react-hook-form";

import { formatNumberCompact } from "@/utils/formatting/formatNumberCompact";

import type { HuntSessionForm, MonsterPreview, PreyBonus } from "../schemas";

type UseHuntStatProps = {
  preyBonusList: PreyBonus[];
  monsterList: MonsterPreview[];
};

export function useHuntStats({ preyBonusList, monsterList }: UseHuntStatProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const duration_seconds = useWatch({ control, name: "duration_seconds" });
  const raw_xp_gain = useWatch({ control, name: "raw_xp_gain" });
  const xp_gain = useWatch({ control, name: "xp_gain" });
  const profit = useWatch({ control, name: "profit" });
  const killedMonsters = useWatch({ control, name: "killed_monsters" });

  const preyIds = killedMonsters.filter((el) => el.preyBonusId);

  const calc = (v = 0) =>
    duration_seconds ? formatNumberCompact(Math.floor((v / duration_seconds) * 3600)) : "0";

  const preysWithMonster = preyIds.map((prey) => {
    const preyBonus = preyBonusList.find((p) => p.id === prey.preyBonusId);
    const monster = monsterList.find((m) => m.id === prey.monsterId);

    return {
      monster,
      preyBonus,
    };
  });

  return {
    rawExpPerHour: calc(raw_xp_gain),
    expPerHour: calc(xp_gain),
    profitPerHour: calc(profit),
    formattedBalance: formatNumberCompact(profit ?? 0),
    preysWithMonster,
  };
}
