import { useContract, useSigner } from "wagmi";
import { combineMapData } from "../utils/combineMapData";
import contractAbi from "../utils/mapNFT.json";
import { parseData } from "../utils/parseData";
import { parseTextLayer } from "../utils/parseTextLayer";

const CONTRACT_ADDRESS = "0xdBbD69e662e2eebe1b8049476774C003b99e0208";

export const GetAllNFT = ({ setMapData, setTextLayer }) => {
  const [{ data: signerData }] = useSigner();

  const mapContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi.abi,
    signerOrProvider: signerData,
  });

  const totalSupply = async () => {
    const supply = await mapContract.totalSupply();
    return supply.toNumber();
  }

  const getTokenUri = async (tokenId) => {
    const uri = await mapContract.tokenURI(tokenId);
    const response = await fetch(uri);
    const uriData = await response.json();

    // console.log(uriData);
    return uriData;
  };

  const getAllNFT = async () => {
    const supply = await totalSupply();

    var mapData = []

    if (supply > 0) {
      try {
        for (var i = 1; i <= supply; i++) {

          const uriData = await getTokenUri(i);

          const parsedMapData = parseData(uriData);
          mapData.push(parsedMapData);
        }
        const combinedMapData = combineMapData(mapData);
        console.log(combinedMapData);
        setMapData(combinedMapData);

      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("No NFTs have been minted yet!")
    }
  }

  return (
    <div className="flex flex-col items-center">
      {signerData && (
        <button
          className="px-6 py-2 m-2 font-bold rounded-xl bg-red-400 hover:bg-red-600 transition-colors"
          onClick={getAllNFT}
        >
          Get all NFTs
        </button>
      )}
    </div>
  );
};
