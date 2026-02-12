import {
  IMBUING_SCROLL_ITEM_KEYS,
  IMBUING_SCROLL_KEYS,
  type ImbuingFormValues,
  type ImbuingItem,
} from "../schemas";

const EMPTY_IMBUING_FORM_VALUES = Object.fromEntries(
  [...IMBUING_SCROLL_ITEM_KEYS, ...IMBUING_SCROLL_KEYS].map((key) => [key, 0])
);

export function mapImbuingPricesToForm(rows: ImbuingItem[]): ImbuingFormValues {
  const fromDb = Object.fromEntries(rows.map((row) => [row.key, row.price]));

  return {
    ...EMPTY_IMBUING_FORM_VALUES,
    ...fromDb,
  };
}
