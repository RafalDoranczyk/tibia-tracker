import { useTransition } from "react";

import { useToast } from "@/providers/global";

import { deleteHuntSession } from "../actions/deleteHuntSession";

export function useDeleteHuntSession() {
  const toast = useToast();

  const [isPending, startTransition] = useTransition();

  const deleteSession = async (id: number) => {
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await deleteHuntSession({ id });
          toast.success("Hunt session successfully deleted");
          resolve();
        } catch (err) {
          toast.error("Deleting hunt session failed");
          reject(err);
        }
      });
    });
  };

  return {
    deleteSession,
    isPending,
  };
}
