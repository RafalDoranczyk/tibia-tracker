import Inventory2 from "@mui/icons-material/Inventory2";
import { Avatar, Stack, Typography } from "@mui/material";
import type { ItemPreview } from "@repo/database/items";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { EmptyState } from "@/components";
import { getPublicAssetUrl } from "@/core/assets";
import type { HuntSessionForm } from "../../../schemas";
import { SectionPaperCard } from "../SectionPaperCard";

type LootedItemsProps = {
  itemList: ItemPreview[];
};

export function LootedItems({ itemList }: LootedItemsProps) {
  const { watch } = useFormContext<HuntSessionForm>();

  const looted_items = watch("looted_items");
  const lootedItemsMap = useMemo(() => new Map(itemList.map((e) => [e.id, e])), [itemList]);

  return (
    <SectionPaperCard title="Looted Items" icon={<Inventory2 fontSize="small" color="primary" />}>
      <Stack spacing={2}>
        {looted_items.length === 0 ? (
          <EmptyState size="small" variant="economy" title="No items tracked yet" />
        ) : (
          <Stack spacing={1}>
            {looted_items.map(({ itemId, count }) => {
              const catalogData = lootedItemsMap.get(itemId);
              const imageUrl = getPublicAssetUrl(catalogData?.image_path);

              return (
                <Stack key={itemId} direction="row" spacing={1} alignItems="center">
                  <Avatar src={imageUrl}>
                    {!catalogData?.image_path && catalogData?.name?.[0]}
                  </Avatar>
                  <Typography fontWeight="bold" noWrap>
                    {catalogData?.name ?? `Unknown #${itemId}`}
                  </Typography>
                  <Typography>×{count}</Typography>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Stack>
    </SectionPaperCard>
  );
}
