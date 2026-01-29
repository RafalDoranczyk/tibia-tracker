import {
  Alert,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { AdminOnly } from "@/modules/user";

import type { HuntSessionUnknownEntities, HuntSessionUnknownEntity } from "../types";

type UnknownEntitiesModalProps = {
  open: boolean;
  unknownEntities: HuntSessionUnknownEntities;
  onClose: () => void;
};

function UnknownChips({ title, items }: { title: string; items: HuntSessionUnknownEntity[] }) {
  if (!items.length) return null;

  return (
    <Stack spacing={0.5}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="subtitle2">{title}</Typography>
        <Chip label={items.length} size="small" color="warning" />
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          maxHeight: 200,
          overflowY: "auto",
        }}
      >
        {items.map((i) => (
          <Chip key={i.name} label={`${i.name} ×${i.count}`} size="small" variant="outlined" />
        ))}
      </Box>
    </Stack>
  );
}

export function UnknownEntitiesModal({
  open,
  unknownEntities,
  onClose,
}: UnknownEntitiesModalProps) {
  const items = unknownEntities?.items ?? [];
  const monsters = unknownEntities?.monsters ?? [];
  const total = items.length + monsters.length;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload Hunt Session Log</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Alert severity="warning">
            {total} unknown entities detected. These entities won't be added to the hunt session
            data.
          </Alert>

          <UnknownChips title="Unknown items" items={items} />
          <UnknownChips title="Unknown monsters" items={monsters} />
        </Stack>

        <AdminOnly>
          <div>admin only</div>
        </AdminOnly>
      </DialogContent>
    </Dialog>
  );
}
