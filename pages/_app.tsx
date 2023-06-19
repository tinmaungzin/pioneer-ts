import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Provider from "@/utils/provider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
