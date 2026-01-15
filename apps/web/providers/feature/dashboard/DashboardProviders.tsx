import { ActiveCharacterProvider } from "./ActiveCharacterProvider";

type DashboardProvidersProps = {
  children: React.ReactNode;
  // Initial id of the active character to set on load
  initialCharacterId: string | null;
};

export function DashboardProviders({ children, initialCharacterId }: DashboardProvidersProps) {
  return (
    <ActiveCharacterProvider initialCharacterId={initialCharacterId}>
      {children}
    </ActiveCharacterProvider>
  );
}
