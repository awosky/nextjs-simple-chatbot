import "@/styles/globals.scss";

import { Roboto } from "@next/font/google";
import type { AppProps } from "next/app";

import MessageProvider from "@/store/MessageProvider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <MessageProvider>
        <Component {...pageProps} />
      </MessageProvider>
    </div>
  );
}
