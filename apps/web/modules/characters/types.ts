import type { Character } from "@repo/database/characters";
import type { TibiaDataCharacter } from "@repo/tibia-data";

// We pick only what we want to show in the UI
type TibiaCharacterInfo = TibiaDataCharacter["character"];

type LiveDataFields = {
  level: TibiaCharacterInfo["level"];
  sex: TibiaCharacterInfo["sex"];
  last_login: TibiaCharacterInfo["last_login"];
  achievement_points: TibiaCharacterInfo["achievement_points"];
  residence: TibiaCharacterInfo["residence"];
  vocation: TibiaDataCharacter["character"]["vocation"];
  deaths: TibiaDataCharacter["deaths"];
  world: TibiaCharacterInfo["world"];
};

export type AppCharacter = Character & LiveDataFields;
