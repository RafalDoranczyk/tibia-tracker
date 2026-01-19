import { Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";

import { TooltipIconButton } from "@/components";
import type { Character } from "@/modules/characters";

type CharacterCardProps = {
  character: Character;
  isActive: boolean;
  onEdit: (character: Character) => void;
  onDelete: (character: Character) => void;
  onSelect: (character: Character) => void;
};

export function CharacterCard({
  character,
  onEdit,
  onDelete,
  onSelect,
  isActive,
}: CharacterCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        cursor: isActive ? "default" : "pointer",
        ...(isActive
          ? {
              borderColor: "secondary.main",
            }
          : {
              transition: "border-color 0.2s, box-shadow 0.2s",
              "&:hover": {
                borderColor: "primary.main",
                boxShadow: 2,
              },
            }),
      }}
    >
      <CardHeader title={character.name} subheader={character.world ?? "Unknown world"} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {character.vocation ?? "No vocation data"}
        </Typography>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ justifyContent: "flex-end" }}
        onClick={(e) => e.stopPropagation()}
      >
        {!isActive && (
          <TooltipIconButton
            name="Set as active"
            variant="activate"
            onClick={() => onSelect(character)}
          />
        )}
        <TooltipIconButton variant="edit" onClick={() => onEdit(character)} />
        <TooltipIconButton variant="delete" onClick={() => onDelete(character)} />
      </CardActions>
    </Card>
  );
}
