// ======================
// Fetchers / server logic
// ======================
export { logoutUser } from "./actions/logout.action";
export { startOAuthLogin } from "./actions/start-oauth-login.action";
export { loadUser } from "./loaders/loadUser";
export { loadUserSettings } from "./loaders/loadUserSettings";

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
export { type AppUser, AppUserSchema, UserIDSchema, type UserSetting } from "./schemas";
