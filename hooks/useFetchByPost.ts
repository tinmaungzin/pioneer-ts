import getHeaders from "@/utils/helpers/getHeaders";
import { User } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useFetchByPost(url: string) {
  const { data: session } = useSession();
  const user = session?.user as User;

  return useMutation(async (data: any) => {
    const headers = await getHeaders(user?.token);

    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  });
}
