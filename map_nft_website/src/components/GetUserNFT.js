import { useEffect, useState } from "react";
import { useContract, useSigner } from "wagmi";
import contractAbi from "../utils/mapNFT.json";
import { parseData } from "../utils/parseData";
import { CONTRACT_ADDRESS } from "../utils/contractAddress";

export const GetUserNFT = ({ setMapData }) => {
  const { data: signerData } = useSigner();

  const [hasNFT, setHasNFT] = useState(false);

  const mapContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi.abi,
    signerOrProvider: signerData,
  });

  const getTokenUri = async (tokenId) => {
    const uri = await mapContract.tokenURI(tokenId);
    const response = await fetch(uri);
    const uriData = await response.json();

    // console.log(uriData);
    return uriData;
  };

  const getUserNFTs = async () => {
    const data = await mapContract.getUserNFT();
    try {
      const tokenId = data.toNumber();
      // console.log(signerData._address, tokenId);

      if (tokenId > 0) {
        setHasNFT(true);
        const uriData = await getTokenUri(tokenId);

        const parsedMapData = parseData(uriData);
        console.log(parsedMapData);

        setMapData(parsedMapData);
      } else {
        setHasNFT(false);
        console.log("Connected address has no NFTs!");
        // alert("No NFTs found!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserNFTs();
  }, [signerData])

  return (
    <div className="flex flex-col items-center">
      {signerData && (
        <p className={`font-bold p-2 my-2 rounded-lg ${hasNFT ? 'bg-teal-400' : 'bg-red-400'}`}>
          {hasNFT ? "User NFT loaded" : "No NFT found!"}
        </p>
      )}
    </div>
  );
};
