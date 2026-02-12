import { Card, Grid } from "@mui/material";

import { TooltipIconButton } from "@/components";

import { MAX_CHARACTERS_PER_USER } from "../constants";
import type { Character } from "../schemas";
import { CharacterCard } from "./CharacterCard";

type CharactersGridProps = {
  characters: Character[];
  activeCharacterId?: string | null;
  onCreate: () => void;
  onDelete: (character: Character) => void;
  onSelect: (character: Character) => void;
  onEdit: (character: Character) => void;
};

export function CharactersGrid({
  characters,
  onEdit,
  onDelete,
  onSelect,
  onCreate,
  activeCharacterId,
}: CharactersGridProps) {
  return (
    <Grid spacing={2} container>
      {characters.map((character) => (
        <Grid size={{ xs: 12, lg: 3, xl: 2 }} key={character.id}>
          <CharacterCard
            character={character}
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onSelect}
            isActive={activeCharacterId === character.id}
          />
        </Grid>
      ))}

      {characters.length < MAX_CHARACTERS_PER_USER && (
        <Grid size={{ xs: 12, lg: 3, xl: 2 }}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TooltipIconButton
              title="Create new character"
              size="large"
              color="secondary"
              variant="create"
              onClick={onCreate}
            />
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
