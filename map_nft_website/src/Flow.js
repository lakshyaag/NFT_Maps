import { Wallet } from "./components/Wallet";
import { GetUserNFT } from "./components/GetUserNFT";
import MapElement from "./components/MapElement";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { MintNFT } from "./components/MintNFT";
import { GetAllNFT } from "./components/GetAllNFT";

const defaultMapData = {
  type: "FeatureCollection",
  features: [],
};

const Flow = () => {
  const { data: accountData } = useAccount();

  const connectedAccount = accountData?.address;

  const [mapData, setMapData] = useState(defaultMapData);

  // Clear map if account changes
  useEffect(() => {
    console.log("Account changed!");
    setMapData(defaultMapData);
  }, [connectedAccount]);


  return (
    <div>
      <Wallet />

      <GetAllNFT setMapData={setMapData} />

      {connectedAccount && (
        <div className="flex flex-col items-center">
          <GetUserNFT setMapData={setMapData} />
          <MintNFT />
        </div>
      )}

      <div className="flex flex-col">
        <MapElement nftBounds={mapData} />
      </div>
    </div>
  );
};
export default Flow;
