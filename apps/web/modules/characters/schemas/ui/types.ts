import type { TibiaDataCharacter } from "@/lib/tibia-data";
import type { Character } from "../db/character.schema";

// We pick only what we want to show in the UI
type TibiaCharacterInfo = TibiaDataCharacter["character"];

type LiveDataFields = {
  level: TibiaCharacterInfo["level"];
  sex: TibiaCharacterInfo["sex"];
  last_login: TibiaCharacterInfo["last_login"];
  achievement_points: TibiaCharacterInfo["achievement_points"];
  residence: TibiaCharacterInfo["residence"];
  vocation: string;
  deaths: TibiaDataCharacter["deaths"];
  _cachedAt: string;
};

export type AppCharacter = Omit<Character, "vocation"> & Partial<LiveDataFields>;
