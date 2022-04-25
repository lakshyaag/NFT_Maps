import { Wallet } from "./components/Wallet";
import { GetUserNFT } from "./components/GetUserNFT";
import MapElement from "./MapElement";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { MintNFT } from "./components/MintNFT";
import { GetAllNFT } from "./components/GetAllNFT";

// This is only to prevent console errors
const defaultTextLayer = {
  id: "textLayer",
  type: "symbol",
  layout: {
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 7,
    "text-transform": "uppercase",
    "text-letter-spacing": 0.05,
  },
};

const defaultMapData = {
  type: "FeatureCollection",
  features: [],
};

const Flow = () => {
  const [{ data: accountData }] = useAccount();

  const connectedAccount = accountData?.address;

  const [mapData, setMapData] = useState(defaultMapData);
  const [textLayer, setTextLayer] = useState(defaultTextLayer);

  
  // Clear map if account changes
  useEffect(() => {
    console.log("Account changed!");
    setMapData(defaultMapData);
    setTextLayer(defaultTextLayer);
  }, [connectedAccount]);


  return (
    <div>
      <Wallet />

      <GetAllNFT setMapData={setMapData} setTextLayer={setTextLayer} />
      <MintNFT />

      <div className="flex flex-col">
        <MapElement nftBounds={mapData} textLayer={textLayer} />
      </div>
    </div>
  );
};
export default Flow;
