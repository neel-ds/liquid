import { Navbar } from "@/components";
import { CreateForm } from "@/views";
import Head from "next/head";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Create Profile</title>
        <meta name="description" content="Liquid | Sign Up" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <CreateForm />
    </>
  );
}
