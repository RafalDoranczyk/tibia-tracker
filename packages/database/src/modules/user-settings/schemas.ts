import { UUID, z } from "@repo/validation";
import type { Tables } from "../../types/db";
import { UserIDSchema } from "../user";

export const UserSettingSchema = z.object({
  user_id: UserIDSchema,
  last_active_character_id: UUID.nullable(),
}) satisfies z.ZodType<Tables<"user_settings">>;
export type UserSetting = z.infer<typeof UserSettingSchema>;
