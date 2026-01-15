import { PageHeader } from "@/components";
import type { PagePropsWithCharacter } from "@/modules/characters";
import {
  CharmsView,
  fetchCharacterCharms,
  fetchCharms,
  mergeCharmsWithStatus,
} from "@/modules/charms";

export default async function CharacterCharmsPage({ params }: PagePropsWithCharacter) {
  const { characterId } = params;

  const [allCharms, characterCharms] = await Promise.all([
    fetchCharms(),
    fetchCharacterCharms(characterId),
  ]);

  const charmsWithStatus = mergeCharmsWithStatus(allCharms, characterCharms);

  return (
    <div>
      <PageHeader.Root
        title="Character charms"
        description="Explore and manage your character's charms."
      />
      <CharmsView charms={charmsWithStatus} />
    </div>
  );
}
