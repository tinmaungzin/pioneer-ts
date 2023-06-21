import getHeaders from "@/utils/helpers/getHeaders";
import { User } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function usePostModel<T>(url: string, name: string, method: string) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const queryClient = useQueryClient();

  return useMutation(async (data: T) => {
    const isFormData = data instanceof FormData;
    const headers = await getHeaders(user?.token, isFormData);

    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
      method: method,
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });
    const { message } = await res.json();

    if (!res.ok) {
      let error;

      if (typeof message === "object") {
        const errorField = Object.keys(message)[0];
        const errorMessage = message[errorField];
        error = new Error(errorMessage);
      } else {
        error = new Error(message);
      }

      throw error;
    }

    queryClient.invalidateQueries([name]);
    return message;
  });
}
