import type { TibiaDataCharacter } from "@/lib/tibia-data";
import type { CreateCharacterPayload } from "../schemas";

const mapVocation = (
  vocation: TibiaDataCharacter["character"]["vocation"]
): CreateCharacterPayload["vocation"] => {
  const voc = vocation.toLowerCase();
  if (voc.includes("knight")) return "knight";
  if (voc.includes("paladin")) return "paladin";
  if (voc.includes("sorcerer")) return "sorcerer";
  if (voc.includes("druid")) return "druid";
  if (voc.includes("monk")) return "monk";

  return "knight"; // default fallback but should not happen since we validate vocation on the client
};

export function mapDataCharToDb(
  character: TibiaDataCharacter["character"]
): CreateCharacterPayload {
  return {
    name: character.name,
    vocation: mapVocation(character.vocation),
    world: character.world,
  };
}
