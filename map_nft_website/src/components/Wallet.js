import { useAccount, useConnect, useNetwork } from "wagmi";

export const Wallet = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }] = useAccount({
    fetchEns: false,
  });

  const [{ data: networkData }] = useNetwork();

  if (accountData) {
    return (
      <div className="flex flex-col items-end p-3">
        <div className="flex flex-row items-center justify-around">
          <div className="font-bold text-center">
            <p>Connected to: {accountData.address}</p>
            <p>Network: {networkData.chain.name ?? networkData.chain.id} </p>
            {networkData.chain?.id !== 80001 && (
              <p>You're on the wrong network!</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end p-3">
      <div className="flex flex-row items-center justify-around">
        {connectData.connectors.map((connector) => (
          <button
            className="px-6 py-2 m-2 font-bold rounded-xl bg-amber-400 hover:bg-amber-500 transition-colors"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            Connect using {connector.name}
            {!connector.ready && " (unsupported)"}
          </button>
        ))}

        {connectError && (
          <div>{connectError?.message ?? "Failed to connect"}</div>
        )}
      </div>
    </div>
  );
};
