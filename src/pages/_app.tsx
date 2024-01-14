import Navbar from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { walletConfig } from "@/config/wallet";
import { ConnectKitProvider } from "connectkit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={walletConfig}>
        <ConnectKitProvider
          theme="midnight"
          customTheme={{
            "--ck-font-family": "Trap",
            "--ck-connectbutton-hover-background": "#14b8a6",
          }}
        >
          <Navbar />
          <div className="min-h-[calc(100vh-68px)] pt-16 px-8 sm:px-28 md:px-32 lg:px-48">
            <Component {...pageProps} />
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  );
}
