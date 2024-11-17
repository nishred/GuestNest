import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting } from "../../services/apiSettings";

import { toast } from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isUpdating, mutate } = useMutation({
    mutationFn: updateSetting,

    onSuccess: () => {
      toast.success("Settings updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: () => {
      toast.error("Settings could not be updated");

      throw new Error("Settings could not be updated");
    },
  });

  return { isUpdating, mutate };
}
