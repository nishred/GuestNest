import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");

  const sortByValue = searchParams.get("sortBy") || "startDate-desc";

  let page = searchParams.get("page") || 1;

  page = Number(page);

  const [field, direction] = sortByValue.split("-");

  const sortBy = {
    field,
    direction,
  };

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  const { isLoading, error, data } = useQuery({
    queryKey: ["booking", filter, sortBy, page],
    queryFn: async () => {
      return await getBookings({ filter, sortBy, page });
    },
  });


  const count = data?.count

  const totalPages = Math.ceil(count/PAGE_SIZE);

  if(page < totalPages)
  queryClient.prefetchQuery({
    queryKey: ["booking", filter, sortBy, page + 1],
    queryFn: async () => {
      return await getBookings({ filter, sortBy, page: page + 1 });
    },
  });
  

  if(page > 1)
  queryClient.prefetchQuery({
    queryKey: ["booking", filter, sortBy, page - 1],
    queryFn: async () => {
      return await getBookings({ filter, sortBy, page: page - 1 });
    },
  });

  // this array acts like a dependency array. If the query depends on any value, it should be added here.
  //now whenever the filter changes, react query will re-fetch the data

  return { isLoading, error, data };
}
