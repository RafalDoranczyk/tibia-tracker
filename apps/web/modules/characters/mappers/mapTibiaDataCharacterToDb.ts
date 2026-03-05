import type { SetupNewCharacterPayload } from "@repo/database/global-characters";
import type { TibiaDataCharacter } from "@repo/tibia-data";

const mapVocation = (
  vocation: TibiaDataCharacter["character"]["vocation"]
): SetupNewCharacterPayload["vocation"] => {
  const voc = vocation.toLowerCase();
  if (voc.includes("knight")) return "knight";
  if (voc.includes("paladin")) return "paladin";
  if (voc.includes("sorcerer")) return "sorcerer";
  if (voc.includes("druid")) return "druid";
  if (voc.includes("monk")) return "monk";

  return "none";
};

export function mapTibiaDataCharacterToDb(
  character: TibiaDataCharacter["character"]
): Omit<SetupNewCharacterPayload, "userId"> {
  return {
    name: character.name,
    vocation: mapVocation(character.vocation),
    world: character.world,
  };
}
