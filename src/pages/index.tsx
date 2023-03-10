import Head from "next/head";

import { META } from "@/constants";
import Home from "@/containers/Home";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>{META.TITLE}</title>
        <meta name="description" content={META.DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Home />
      </main>
    </>
  );
}
