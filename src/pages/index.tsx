import { Hero } from "@/views";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Liquid</title>
        <meta name="description" content="Liquid" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
}
