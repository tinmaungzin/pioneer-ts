import getHeaders from "@/utils/helpers/getHeaders";
import { User } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function fetchModel<T>(
  url: string,
  token: string | undefined,
): Promise<T> {
  const headers = await getHeaders(token);

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
    headers,
  });
  const models = await res.json();
  models.data.pageCount = Math.ceil(models.data.total / models.data.per_page);
  models.data.data = models.data.data.map((item:any, index:any) => {
    const rowNumber = (models.data.current_page - 1) * models.data.per_page + index + 1;
    return { ...item, rowNumber };
  });
  return models.data as T;
}

export function useFetchModel<T>(
  url: string,
  key: string,
  page: number
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
  } = useQuery<T>([key, user?.token, page], () => fetchModel<T>(url, user?.token));

  return {
    models,
    isLoading,
    isFetching,
    error,
  };
}
