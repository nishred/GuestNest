import { useMutation,useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../services/apiCabins";

import {toast} from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: createEditCabin,

    onSuccess: () => {
      toast("cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },

    onError: () => {
      toast("something went wrong");

      throw new Error("Cabin could not be created");
    },
  });

  return { isCreating: isLoading, mutate };
}
