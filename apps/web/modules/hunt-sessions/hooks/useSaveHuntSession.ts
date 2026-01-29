import { useRouter } from "next/navigation";

import { PATHS } from "@/constants";
import { useRequiredCharacterId } from "@/providers/feature/dashboard";
import { useToast } from "@/providers/global";

import { createHuntSession } from "../actions/createHuntSession";
import { updateHuntSession } from "../actions/updateHuntSession";
import type { HuntSession, HuntSessionFormValues } from "../types";

export const useSaveHuntSession = (huntSessionId?: HuntSession["id"]) => {
  const characterId = useRequiredCharacterId();
  const router = useRouter();
  const toast = useToast();

  return async (data: HuntSessionFormValues) => {
    try {
      if (huntSessionId) {
        await updateHuntSession({ ...data, id: huntSessionId, character_id: characterId });
      } else {
        await createHuntSession({ ...data, character_id: characterId });
      }
      toast.success("Hunt session saved");
      router.push(PATHS.CHARACTER(characterId).HUNT_SESSIONS.LIST);
    } catch (err) {
      toast.error(`Hunt session saving error: ${err}`);
    }
  };
};
