"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FloatingActionButton } from "@/components";
// import { useUnsavedChangesGuard } from "@/hooks";
import type { HuntPlace } from "@/modules/hunt-places";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";
import { useToast } from "@/providers/global";

import { createHuntSession } from "../actions/createHuntSession";
import { updateHuntSession } from "../actions/updateHuntSession";
import { HuntSessionFormSchema } from "../schemas";
import type {
  DamageElement,
  HuntSession,
  HuntSessionFormValues,
  MonsterPreview,
  SupplyItem,
} from "../types";
import { mapHuntSessionToFormValues } from "../utils/mapHuntSessionToFormValues";
import { HuntSessionInputAnalyzer } from "./sections/HuntSessionInputAnalyzer";
import { HuntSessionLogDetails } from "./sections/HuntSessionLogDetails";
import { HuntSessionSuppliesAnalyzer } from "./sections/HuntSessionSuppliesAnalyzer";

type HuntSessionViewProps = {
  monsterList: MonsterPreview[];
  huntPlaceList: HuntPlace[];
  supplyList: SupplyItem[];
  damageElementList: DamageElement[];
  huntSession?: HuntSession | null;
};

export function HuntSessionView({
  monsterList,
  huntPlaceList,
  supplyList,
  damageElementList,
  huntSession,
}: HuntSessionViewProps) {
  const router = useRouter();
  const toast = useToast();
  const characterId = useRequiredCharacterId();

  const [isPending, startTransition] = useTransition();

  const methods = useForm<HuntSessionFormValues>({
    resolver: zodResolver(HuntSessionFormSchema),
    defaultValues: huntSession
      ? mapHuntSessionToFormValues(huntSession)
      : {
          character_id: characterId,
          date: new Date().toISOString().slice(0, 10),
          level: 100,
          raw_xp_gain: 0,
          xp_gain: 0,
          balance: 0,
          minutes: 0,
          player_count: 1,
          monsters: [],
          supplies: [],
          damage_elements: [],
          place_id: huntPlaceList[0].id,
          damage_sources: [],
        },
  });

  const { handleSubmit, watch } = methods;

  const monsters = watch("monsters");

  // useUnsavedChangesGuard(formState.isDirty);

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        if (huntSession) {
          await updateHuntSession({ ...data, id: huntSession.id });
        } else {
          await createHuntSession(data);
        }
        toast.success("Hunt session saved");
        router.push(`/dashboard/characters/${characterId}/hunt-sessions`);
      } catch (err) {
        toast.error(`Hunt session saving error: ${err}`);
      }
    });
  });

  return (
    <FormProvider {...methods}>
      <Box maxWidth={1600}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
            <HuntSessionLogDetails
              monsters={monsters}
              isHuntSession={!!huntSession}
              monsterList={monsterList}
              huntPlaceList={huntPlaceList}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
            <HuntSessionInputAnalyzer damageElementList={damageElementList} />
          </Grid>

          <Grid size={{ xs: 12, lg: 6, xl: 4 }}>
            <HuntSessionSuppliesAnalyzer supplyList={supplyList} />
          </Grid>
        </Grid>
      </Box>

      <FloatingActionButton visible={monsters.length > 0} onClick={onSubmit} loading={isPending}>
        Save changes
      </FloatingActionButton>
    </FormProvider>
  );
}
