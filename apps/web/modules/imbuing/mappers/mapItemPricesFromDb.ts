import { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "../constants";
import type { ImbuingFormValues, ImbuingItem } from "../schemas";

const EMPTY_IMBUING_FORM_VALUES: ImbuingFormValues = Object.fromEntries(
  [IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS].flat().map((key) => [key, 0])
) as ImbuingFormValues;

export function mapItemPricesFromDb(rows: ImbuingItem[]): ImbuingFormValues {
  return {
    ...EMPTY_IMBUING_FORM_VALUES,
    ...Object.fromEntries(rows.map((row) => [row.key, row.price])),
  };
}
