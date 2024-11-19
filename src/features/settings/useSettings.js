import { getSettings } from "../../services/apiSettings";

import { useQuery } from "@tanstack/react-query";

export default function useSettings() {
  const { isLoading, error, data:settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });


  console.log(settings)
  return { isLoading, error, settings};
}

// note : The query function has to return a promise so it has to be an async function
