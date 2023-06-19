import getHeaders from "@/utils/helpers/getHeaders";
import { User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function fetchOneModel<T>(
  url: string,
  token: string | undefined
): Promise<T> {
  const headers = await getHeaders(token);

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
    headers,
  });
  const model = await res.json();

  return model.data as T;
}

export function useFetchOneModel<T>(
  url: string,
  name: string
): {
  model?: T;
  isLoading: boolean;
  isFetching: boolean;
  error: any;
} {
  const { data: session } = useSession();
  const user = session?.user as User;
  const {
    data: model,
    isLoading,
    isFetching,
    error,
  } = useQuery<T>([name, user?.token], () =>
    fetchOneModel<T>(url, user?.token)
  );

  return {
    model,
    isLoading,
    isFetching,
    error,
  };
}
