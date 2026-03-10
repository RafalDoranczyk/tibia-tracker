import { Email, UUID, z } from "@repo/validation";
import type { Enums, Tables } from "../../types/db";

export const UserIDSchema = UUID;
export type UserID = z.infer<typeof UserIDSchema>;

export const UserRoleEnumSchema = z.enum(["user", "admin"]) satisfies z.ZodType<Enums<"user_role">>;
export type UserRole = z.infer<typeof UserRoleEnumSchema>;

export const AppUserSchema = z
  .object({
    id: UUID,
    email: Email.optional().nullable(),
    role: UserRoleEnumSchema,
  })
  .strict();

export type AppUser = z.infer<typeof AppUserSchema>;

export const OAuthProviderSchema = z.enum(["discord", "google"]);
export type OAuthProvider = z.infer<typeof OAuthProviderSchema>;

export const UserSettingSchema = z.object({
  user_id: UserIDSchema,
  last_active_character_id: UUID.nullable(),
}) satisfies z.ZodType<Tables<"user_settings">>;
export type UserSetting = z.infer<typeof UserSettingSchema>;
