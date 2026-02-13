import { z } from "zod";

import type { Enums, Tables } from "@/core/supabase/types";
import { UUID } from "@/lib/zod";

export const UserIDSchema = UUID;

export const UserRoleEnumSchema = z.enum(["user", "admin"]) satisfies z.ZodType<Enums<"user_role">>;
export type UserRole = z.infer<typeof UserRoleEnumSchema>;
export const UserSettingSchema = z.object({
  user_id: UserIDSchema,
  last_active_character_id: UUID.nullable(),
}) satisfies z.ZodType<Tables<"user_settings">>;

export type UserSetting = z.infer<typeof UserSettingSchema>;
