import { useQueryClient } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import { createEditCabin } from "../services/apiCabins";

import { toast } from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: async ({ cabin, id }) => {
      console.table(cabin, id);

      await createEditCabin(cabin, id);
    },

    onSuccess: () => {
      toast("cabin edited successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },

    onError: () => {
      toast("something went wrong");

      throw new Error("Cabin could not be edited");
    },
  });

  return { isEditing: isLoading, mutate };
}
