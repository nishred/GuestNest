import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";


export default function useBookings() {
    
  console.log("useBookings");

  const { isLoading, error, data } = useQuery({
    queryKey: ["booking"],
    queryFn: getBookings,
  });

  console.log(data)

  return { isLoading, error, data };
}
