"use client";

import { FormProvider } from "react-hook-form";

import { useHuntSessionForm } from "../hooks/useHuntSessionForm";
import type { HuntSession } from "../schemas";

export function HuntSessionFormProvider({
  huntSession,
  placeId,
  children,
}: React.PropsWithChildren<{
  huntSession?: HuntSession | null;
  placeId: number;
}>) {
  const methods = useHuntSessionForm({ huntSession, placeId });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
