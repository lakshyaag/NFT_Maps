import { useContract, useSigner } from "wagmi";
import contractAbi from "../utils/mapNFT.json";
import { parseData } from "../utils/parseData";
import { parseTextLayer } from "../utils/parseTextLayer";

const CONTRACT_ADDRESS = "0xdE925B3c8b5734c3a7ba5fC68a6aa3ebB6bd80D4";

export const GetUserNFT = ({ setMapData, setTextLayer }) => {
  const [{ data: signerData }] = useSigner();

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
        const uriData = await getTokenUri(tokenId);

        const parsedMapData = parseData(uriData);
        console.log(parsedMapData);

        setTextLayer(parseTextLayer(parsedMapData));

        setMapData(parsedMapData);
      } else {
        console.log("Connected address has no NFTs!");
        alert("No NFTs found!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {signerData && (
        <button
          className="px-6 py-2 m-2 font-bold rounded-xl bg-red-400 hover:bg-red-600 transition-colors"
          onClick={getUserNFTs}
        >
          Get NFTs
        </button>
      )}
    </div>
  );
};
