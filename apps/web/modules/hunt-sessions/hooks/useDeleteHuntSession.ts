import { useCallback, useState } from "react";

import { useToast } from "@/hooks";

import { deleteHuntSession } from "../actions/delete-hunt-session";

export function useDeleteHuntSession(characterId: string) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await deleteHuntSession({ id, characterId });
        toast.success("Hunt session deleted");
      } catch {
        toast.error("Failed to delete hunt session");
      } finally {
        setLoading(false);
      }
    },
    [toast, characterId]
  );

  return { mutate, loading };
}
