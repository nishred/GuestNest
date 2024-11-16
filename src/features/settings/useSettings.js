import { getSettings } from "../../services/apiSettings";

import { useQuery } from "@tanstack/react-query";

export default function useSettings() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  console.log(data)

  return { isLoading, error, data };
}

// note : The query function has to return a promise so it has to be an async function
