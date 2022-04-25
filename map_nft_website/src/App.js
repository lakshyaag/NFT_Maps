import { WagmiProvider } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Flow from "./Flow";

const connector = [new InjectedConnector()];

const App = () => {
  return (
    <WagmiProvider autoConnect connectors={connector}>
      <Flow />
    </WagmiProvider>
  );
};
export default App;
