import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { PATHS } from "@/core/paths";
import { useRequiredCharacterId } from "@/modules/characters";
import { useToast } from "@/providers/app";

import { createHuntSession } from "../actions/create-hunt-session";
import { updateHuntSession } from "../actions/update-hunt-session";
import { mapHuntSessionFormToPayload } from "../mappers/mapHuntSessionFormToPayload";
import type { HuntSession, HuntSessionForm } from "../schemas";

export const useSaveHuntSession = () => {
  const characterId = useRequiredCharacterId();
  const router = useRouter();
  const toast = useToast();

  return useCallback(
    async (formData: HuntSessionForm, id?: HuntSession["id"]) => {
      try {
        const formPayload = mapHuntSessionFormToPayload({ formData, characterId });

        console.log(formPayload);
        if (id) {
          await updateHuntSession({ ...formPayload, id });
        } else {
          await createHuntSession(formPayload);
        }

        toast.success("Hunt session saved");
        router.push(PATHS.CHARACTER(characterId).HUNT_SESSIONS.LIST);
      } catch {
        toast.error("Hunt session saving error");
      }
    },
    [characterId, router, toast]
  );
};
