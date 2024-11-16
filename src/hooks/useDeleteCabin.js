import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast("Cabin has been deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => {
      toast("Something went wrong");
    },
  });

  return { isDeleting: isLoading, mutate };
}
