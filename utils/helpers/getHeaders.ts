import { getCsrfToken } from "next-auth/react";

async function getHeaders(
  token?: string | undefined,
  isFormData: boolean = false
) {
  const csrfToken = await getCsrfToken();

  const headers: HeadersInit = {
    // "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (csrfToken) {
    headers["X-CSRF-TOKEN"] = csrfToken;
  }
  if (isFormData) {
    delete headers["Content-Type"];
  } else {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}
export default getHeaders;
