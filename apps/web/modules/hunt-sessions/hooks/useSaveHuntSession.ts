import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { PATHS } from "@/constants";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";
import { useToast } from "@/providers/global";

import { createHuntSession } from "../actions/createHuntSession";
import { updateHuntSession } from "../actions/updateHuntSession";
import { mapHuntSessionFormToPayload } from "../mappers/mapHuntSessionFormToPayload";
import type { HuntSession, HuntSessionForm } from "../types";

export const useSaveHuntSession = () => {
  const character_id = useRequiredCharacterId();
  const router = useRouter();
  const toast = useToast();

  return useCallback(
    async (data: HuntSessionForm, id?: HuntSession["id"]) => {
      try {
        const formPayload = { ...mapHuntSessionFormToPayload(data), character_id };

        if (id) {
          await updateHuntSession({ ...formPayload, id });
        } else {
          await createHuntSession(formPayload);
        }

        toast.success("Hunt session saved");
        router.push(PATHS.CHARACTER(character_id).HUNT_SESSIONS.LIST);
      } catch {
        toast.error("Hunt session saving error");
      }
    },
    [character_id, router, toast]
  );
};
