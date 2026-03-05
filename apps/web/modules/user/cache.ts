import type { UserID } from "@repo/database/user";

export const UserCache = {
  settings: (userId: UserID) => `user-settings-${userId}`,
};
