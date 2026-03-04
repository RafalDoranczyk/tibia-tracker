import type { UserID } from "@repo/database";

export const UserCache = {
  settings: (userId: UserID) => `user-settings-${userId}`,
};
