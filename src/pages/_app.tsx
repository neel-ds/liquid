import { Navbar } from "@/components";
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
            "--ck-connectbutton-hover-background": "#8b5cf6",
          }}
        >
          <div className="min-h-[calc(100vh-68px)] ">
            <Component {...pageProps} />
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  );
}
