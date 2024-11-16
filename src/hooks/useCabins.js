import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../services/apiCabins";

export default function useCabins() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["cabin"],

    queryFn: getCabins,
  });

   return {isLoading,error,data}

}
