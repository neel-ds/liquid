import Navbar from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-68px)] pt-16 px-8 sm:px-28 md:px-32 lg:px-48">
        <Component {...pageProps} />
      </div>
    </>
  );
}
