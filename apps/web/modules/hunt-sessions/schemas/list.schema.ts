import { HuntPlaceSchema } from "@/modules/hunt-places";

import { HuntSessionDbFieldsSchema } from "./db.schema";

export const HuntSessionListItemSchema = HuntSessionDbFieldsSchema.extend({
  place: HuntPlaceSchema,
});
