import Inventory2 from "@mui/icons-material/Inventory2";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { EmptyState } from "@/components";
import { getImageUrl } from "@/core/supabase";

import type { HuntSessionForm, ItemPreview } from "../../schemas";

type LootedItemsProps = {
  itemList: ItemPreview[];
  isAnyItemUnknown: boolean;
  openUnknownEntitiesModal: () => void;
};

export function LootedItems({
  itemList,
  isAnyItemUnknown,
  openUnknownEntitiesModal,
}: LootedItemsProps) {
  const { watch } = useFormContext<HuntSessionForm>();

  const looted_items = watch("looted_items");

  const itemsForGrid = useMemo(
    () =>
      looted_items.map((i) => ({
        id: i.itemId,
        count: i.count,
      })),
    [looted_items]
  );

  const lootedItemsMap = useMemo(() => new Map(itemList.map((e) => [e.id, e])), [itemList]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Inventory2 fontSize="small" color="primary" />
        <Typography variant="subtitle2" fontWeight={700}>
          Looted Items
        </Typography>
      </Stack>

      <Divider />

      {isAnyItemUnknown && (
        <Button size="small" variant="text" onClick={openUnknownEntitiesModal} color="error">
          Some items are unknown and cannot be stored.
        </Button>
      )}

      {itemsForGrid.length === 0 ? (
        <EmptyState size="small" variant="economy" title="No items tracked yet" />
      ) : (
        looted_items.map((item) => {
          return (
            <Stack key={item.itemId} spacing={1}>
              {looted_items.map((e) => {
                const catalogData = lootedItemsMap.get(e.itemId);
                const imageUrl = getImageUrl(catalogData?.image_path);

                return (
                  <Stack key={e.itemId} direction="row" spacing={1} alignItems="center">
                    <Avatar src={imageUrl}>
                      {!catalogData?.image_path && catalogData?.name?.[0]}
                    </Avatar>
                    <Typography fontWeight="bold" noWrap>
                      {catalogData?.name ?? `Unknown #${e.itemId}`}
                    </Typography>
                    <Typography>×{e.count}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          );
        })
      )}
    </Stack>
  );
}
