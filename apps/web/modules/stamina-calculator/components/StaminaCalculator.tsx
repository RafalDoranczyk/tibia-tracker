"use client";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { type Control, Controller, useForm } from "react-hook-form";

import { FULL_STAMINA_MINUTES } from "../constants";
import { calculateStaminaRegenTime } from "../utils/calculateStaminaRegenTime";

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

type FormValues = {
  current_stamina: string;
  target_stamina: string;
};

type StaminaInputProps = {
  control: Control<FormValues>;
  label: string;
  name: keyof FormValues;
};

function StaminaInput({ control, label, name }: StaminaInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let raw = e.target.value.replace(/\D/g, "");

          raw = raw.slice(0, 4);

          let formatted = raw;

          if (raw.length > 0) {
            let h = raw.slice(0, 2);
            if (Number.parseInt(h) > 42) h = "42";

            if (raw.length <= 2) {
              formatted = h;
            } else {
              let m = raw.slice(2, 4);
              if (Number.parseInt(m) > 59) m = "59";
              formatted = `${h}:${m}`;
            }
          }

          field.onChange(formatted);
        };

        return (
          <TextField
            {...field}
            value={field.value ?? ""}
            onChange={handleChange}
            sx={{ width: 130 }}
            label={label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            placeholder="00:00"
            slotProps={{
              htmlInput: {
                inputMode: "numeric",
                maxLength: 5,
              },
            }}
          />
        );
      }}
    />
  );
}

export function StaminaCalculator() {
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      current_stamina: "40:00",
      target_stamina: `${FULL_STAMINA_MINUTES}:00`,
    },
  });

  const [currentStamina, targetStamina] = watch(["current_stamina", "target_stamina"]);

  const result = useMemo(() => {
    if (!(currentStamina && targetStamina) || currentStamina.length < 4) return null;

    const current = toMinutes(currentStamina);
    const target = toMinutes(targetStamina);

    if (current >= target) return null;

    const regenMinutes = calculateStaminaRegenTime(current, target);

    const hours = Math.floor(regenMinutes / 60);
    const duration_seconds = regenMinutes % 60;
    const timeRemainingLabel = `${hours} hours and ${duration_seconds} minutes`;

    const readyAt = new Date(Date.now() + regenMinutes * 60_000);

    return { regenMinutes, timeRemainingLabel, readyAt };
  }, [currentStamina, targetStamina]);

  const readyAtDate = result?.readyAt.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  const readyAtTime = result?.readyAt.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Stack direction="row" alignItems="center" spacing={4} mt={4}>
      <Stack spacing={2} maxWidth={280}>
        <Stack direction="row" spacing={2}>
          <StaminaInput control={control} label="Current" name="current_stamina" />
          <StaminaInput control={control} label="Target" name="target_stamina" />
        </Stack>
        <Button
          onClick={() => {
            setValue("target_stamina", `${FULL_STAMINA_MINUTES}:00`);
          }}
          variant="outlined"
          fullWidth
        >
          Regenerate to full
        </Button>
      </Stack>

      {result && (
        <Stack
          p={2}
          borderRadius={2}
          border="1px solid"
          borderColor="divider"
          spacing={1}
          bgcolor="background.paper"
        >
          <Typography variant="button" color="text.secondary">
            Your stamina will be ready on
          </Typography>

          <Typography variant="h4" fontWeight={700}>
            {readyAtDate} | {readyAtTime}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            You need to rest for {result.timeRemainingLabel}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
