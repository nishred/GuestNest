import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking } from "../../services/apiBookings";
import { useMutation } from "@tanstack/react-query";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });

      toast.success(`Booking #${data.id} successfully deleted`);
    },
  });

  return { deleteMutate, isDeleting };
}
