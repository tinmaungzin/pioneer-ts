import getHeaders from "@/utils/helpers/getHeaders";
import { User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function fetchModel<T>(
  url: string,
  name: string,
  token: string | undefined
): Promise<T> {
  const headers = await getHeaders(token);

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
    headers,
  });
  const models = await res.json();
  return models[name] as T;
}

export function useFetchAllModel<T>(
  url: string,
  name: string,
  key: string
): {
  models?: T;
  isLoading: boolean;
  isFetching: boolean;
  error: any;
} {
  const { data: session } = useSession();
  const user = session?.user as User;
  const {
    data: models,
    isLoading,
    isFetching,
    error,
  } = useQuery<T>([key, user?.token], () =>
    fetchModel<T>(url, name, user?.token)
  );

  return {
    models,
    isLoading,
    isFetching,
    error,
  };
}
