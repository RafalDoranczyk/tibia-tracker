import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useRequiredCharacterId } from "@/modules/characters";
import { PATHS } from "@/paths";
import { useToast } from "@/providers/app";

import { createHuntSession } from "../actions/createHuntSession";
import { updateHuntSession } from "../actions/updateHuntSession";
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
