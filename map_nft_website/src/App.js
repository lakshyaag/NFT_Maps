import { providers } from 'ethers';
import { WagmiProvider, createWagmiClient } from 'wagmi'
import Flow from "./Flow";

const client = createWagmiClient({
  autoConnect: false,
  provider(config) {
    return new providers.AlchemyProvider(config.chainId)
  }
})

const App = () => {
  return (
    <WagmiProvider client={client}>
      <Flow />
    </WagmiProvider>
  );
};
export default App;
