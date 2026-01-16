"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ControlledSelect, ControlledTextField, PageHeader } from "@/components";
import type { Monster } from "@/modules/bestiary";
import type { HuntPlace } from "@/modules/hunt-spots";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";

import { createHuntSession } from "../actions/createHuntSession";
import {
  type CreateHuntSessionFullPayload,
  HuntSessionFormSchema,
  type HuntSessionFormValues,
  type SupplyItem,
} from "../schemas";
import type { HuntSessionParseResult } from "../utils/parseHuntSessionText";
import { HuntSessionDamageSources } from "./sections/HuntSessionDamageSources";
import { HuntSessionDamageTypes } from "./sections/HuntSessionDamageTypes";
import { HuntSessionMonsters } from "./sections/HuntSessionMonsters";
import { HuntSessionSupplies } from "./sections/HuntSessionSupplies";
import { UploadSessionModal } from "./UploadSessionModal";

const playerOptions = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
];

type HuntSessionViewProps = {
  monsterList: Monster[];
  places: HuntPlace[];
  suppliesList: SupplyItem[];
  huntSession?: CreateHuntSessionFullPayload & {
    id: string;
  };
};

export function HuntSessionView({
  monsterList,
  places,
  suppliesList,
  huntSession,
}: HuntSessionViewProps) {
  const router = useRouter();
  const characterId = useRequiredCharacterId();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [monsters, setMonsters] = useState<{ name: string; count: number }[]>([]);

  // const [damageTypes, setDamageTypes] = useState<{ type: string; percent: number }[]>([]);
  // const [damageSources, setDamageSources] = useState<{ monster: string; percent: number }[]>([]);

  const methods = useForm<HuntSessionFormValues>({
    resolver: zodResolver(HuntSessionFormSchema),
    defaultValues: {
      level: 100,
      raw_xp_gain: 0,
      balance: 0,
      minutes: 60,
      place_id: places[0].id,
      player_count: 1,
      monsters: [],
      supplies: [],
      damageTypes: [],
      damageSources: [],
    },
  });

  const { control, handleSubmit, setValue } = methods;

  const handleImport = (parsed: HuntSessionParseResult) => {
    const exp = parsed.rawXpGain;
    const bal = parsed.balance;
    const mins = parsed.duration;
    const date = parsed.date;

    if (exp !== undefined) setValue("raw_xp_gain", exp);
    if (bal !== undefined) setValue("balance", bal);
    if (mins !== undefined) setValue("minutes", mins);
    if (date !== undefined) setValue("date", date);

    if (Array.isArray(parsed.monsters)) setMonsters(parsed.monsters);
  };

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        if (huntSession) {
          await createHuntSession({
            id: huntSession.id,
            characterId,
            ...data,
            monsters,
          });
        } else {
          await createHuntSession({
            ...data,
            characterId,
            monsters,
          });
        }

        router.push(`/dashboard/characters/${characterId}/hunt-sessions`);
      } catch (err) {
        console.error(err);
      }
    });
  });

  return (
    <FormProvider {...methods}>
      <Box>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
          <PageHeader.Root title={huntSession ? "Edit Hunt Session" : "Add New Hunt Session"} />

          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
            color="secondary"
          >
            Upload session log
          </Button>
        </Stack>

        <Stack spacing={3} flexDirection={{ xs: "row", md: "column" }}>
          <Grid spacing={3} container direction={{ xs: "column", md: "row" }}>
            <Grid container size={6} spacing={3}>
              <Grid size={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #1a1a1a, #292929)",
                    color: "white",
                  }}
                >
                  <Stack spacing={3}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <ControlledSelect
                        label="Player count"
                        name="player_count"
                        control={control}
                        options={playerOptions}
                      />

                      <ControlledTextField<HuntSessionFormValues>
                        control={control}
                        name="level"
                        type="number"
                        label="Level"
                        fullWidth
                      />

                      <ControlledTextField
                        control={control}
                        name="minutes"
                        type="number"
                        label="Minutes"
                        fullWidth
                      />

                      <ControlledTextField control={control} name="date" type="date" label="Date" />
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <ControlledTextField
                        control={control}
                        name="balance"
                        type="number"
                        label="Balance"
                        fullWidth
                      />

                      <ControlledTextField
                        control={control}
                        name="raw_xp_gain"
                        type="number"
                        label="Raw XP Gain"
                        fullWidth
                      />
                    </Stack>

                    <ControlledSelect
                      label="Place"
                      name="place_id"
                      control={control}
                      options={places}
                    />
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={12}>
                <HuntSessionMonsters monsterList={monsterList} />
              </Grid>
            </Grid>

            <Grid alignContent="start" container size={6} spacing={3}>
              <Grid size={12}>
                <HuntSessionSupplies suppliesList={suppliesList} />
              </Grid>

              <Grid size={12}>
                <HuntSessionDamageTypes />
              </Grid>
              <Grid size={12}>
                <HuntSessionDamageSources />
              </Grid>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => router.push(`/dashboard/characters/${characterId}/hunt-sessions`)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button variant="contained" color="primary" onClick={onSubmit} disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Stack>

        <UploadSessionModal open={open} onClose={() => setOpen(false)} onImport={handleImport} />
      </Box>
    </FormProvider>
  );
}
