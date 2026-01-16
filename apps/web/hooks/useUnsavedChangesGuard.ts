import { useBeforeUnloadWarning } from "./useBeforeUnloadWarning";
import { useNavigationWarning } from "./useNavigationWarning";

export function useUnsavedChangesGuard(hasUnsavedChanges: boolean) {
  useBeforeUnloadWarning(hasUnsavedChanges);
  useNavigationWarning(hasUnsavedChanges);
}
