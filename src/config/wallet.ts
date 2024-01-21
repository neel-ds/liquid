import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { sepolia } from "wagmi/chains";

const chains = [sepolia];
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const walletConfig = createConfig(
  getDefaultConfig({
    appName: "Liquid",
    walletConnectProjectId,
    chains,
  })
);
