import { Box } from "@mui/material";

import { PageHeader } from "@/components";
import { CharactersView, fetchCharacters } from "@/modules/characters";

export default async function CharactersPage() {
  const characters = await fetchCharacters();

  const hasCharacters = characters.length > 0;

  return (
    <Box>
      <PageHeader.Root
        title=" Your characters"
        description="Characters represent your playable profiles. You can create multiple characters and switch
          between them at any time. The active character is used across all character-related
          features like bestiary, hunts, and statistics."
      />

      <CharactersView characters={characters} hasCharacters={hasCharacters} />
    </Box>
  );
}
