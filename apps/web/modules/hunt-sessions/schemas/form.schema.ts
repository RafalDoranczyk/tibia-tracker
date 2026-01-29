import { HuntSessionPayloadBaseSchema } from "./api.schema";
import { HuntSessionDbFieldsSchema } from "./db.schema";

export const HuntSessionFormSchema = HuntSessionPayloadBaseSchema.omit({
  character_id: true,
}).extend({
  id: HuntSessionDbFieldsSchema.shape.id.optional(),
});
