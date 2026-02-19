import type { AIHuntSessionScan, HuntSessionForm, MonsterPreview } from "../schemas";

const parseSessionToSeconds = (sessionStr: string | undefined): number => {
  if (!sessionStr) return 0;
  const match = sessionStr.match(/(\d+):(\d+)h/);
  if (!match) return 0;

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  return hours * 3600 + minutes * 60;
};

export function parseAIScanToForm(
  scan: AIHuntSessionScan,
  monsterList: MonsterPreview[]
): Partial<HuntSessionForm> {
  const { hunt_analyser, skills_window } = scan;

  const killed_monsters =
    hunt_analyser?.killed_monsters
      .map((scannedMonster) => {
        const normalize = (name: string) => name.toLowerCase().replace(/[\s_]/g, "");
        const target = normalize(scannedMonster.name);

        const dbMonster = monsterList.find((m) => normalize(m.name) === target);

        return {
          monsterId: dbMonster?.id ?? 0,
          count: scannedMonster.amount,
          preyBonusId: null,
          charmBonusId: null,
        };
      })
      .filter((m) => m.monsterId !== 0) ?? [];

  return {
    level: skills_window?.level ?? 0,
    duration_seconds: parseSessionToSeconds(hunt_analyser?.session),
    raw_xp_gain: hunt_analyser?.raw_xp_gain ?? 0,
    xp_gain: hunt_analyser?.xp_gain ?? 0,
    loot_value: hunt_analyser?.loot ?? 0,
    supplies_cost: hunt_analyser?.supplies ?? 0,
    profit: hunt_analyser?.balance ?? 0,
    damage: hunt_analyser?.damage ?? 0,
    healing: hunt_analyser?.healing ?? 0,
    killed_monsters,
    looted_items: [],
    supplies: [],
    damage_elements: [],
    monster_damage_sources: [],
    player_count: 1,
    date: new Date().toISOString().split("T")[0],
  };
}
