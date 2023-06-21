import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Provider from "@/utils/provider";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { SocketContext, socket } from "@/context/socket";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Pioneer Entertainment</title>
        <meta name="pioneer" content="Pioneer Booking App Dashboard" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/favicon_io/site.webmanifest"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Provider>
        <SocketContext.Provider value={socket}>
          <ToastProvider>
            <Component {...pageProps} socket={socket} />
            <Toaster />
          </ToastProvider>
        </SocketContext.Provider>
      </Provider>
    </SessionProvider>
  );
}
