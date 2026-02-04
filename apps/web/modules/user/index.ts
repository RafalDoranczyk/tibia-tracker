// ======================
// Fetchers / server logic
// ======================
export { loginWithGithub, loginWithGoogle, logout } from "./actions/auth";
// ======================
// UI – public components
// ======================
export { AdminOnly, UserRoleGate } from "./components/UserRoleGate";
// ======================
// Providers and hooks
// ======================
export { usePersistActiveCharacter } from "./hooks/usePersistActiveCharacter";
export { UserProvider, useUser } from "./providers/UserProvider";
export { UserSettingsProvider, useUserSettings } from "./providers/UserSettingsProvider";
// ======================
// Shared
// ======================
export type { AppUser, UserSetting } from "./schemas/user.schema";
export { loadUser } from "./server/loadUser";
