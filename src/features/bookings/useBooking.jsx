import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

import {useQuery} from "@tanstack/react-query"

export default function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => {
      return getBooking(bookingId);
    },
  });

  return { booking, isLoading, error };
}
