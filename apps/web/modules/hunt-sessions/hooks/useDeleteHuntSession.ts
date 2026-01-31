import { useCallback, useState } from "react";

import { useToast } from "@/providers/global";

import { deleteHuntSession } from "../actions/deleteHuntSession";

export function useDeleteHuntSession() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await deleteHuntSession({ id });
        toast.success("Hunt session deleted");
      } catch {
        toast.error("Failed to delete hunt session");
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return { mutate, loading };
}
