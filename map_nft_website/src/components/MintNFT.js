import { useContract, useSigner } from "wagmi";
import { convert } from "../utils/convert";
import contractAbi from "../utils/mapNFT.json";

const CONTRACT_ADDRESS = "0xdE925B3c8b5734c3a7ba5fC68a6aa3ebB6bd80D4";

export const MintNFT = ({ setMapData, setTextLayer }) => {
  const [{ data: signerData }] = useSigner();

  const mapContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi.abi,
    signerOrProvider: signerData,
  });

  let coordA = { long: 119.399414062, lat: -29.688052749 };
  let coordB = { long: 131.30859375, lat: -29.688052749 };
  let coordC = { long: 131.30859375, lat: -23.644524198 };
  let coordD = { long: 119.399414062, lat: -23.644524198 };

  const mintNFT = async (coordA, coordB, coordC, coordD) => {
    console.log("Signing with: ", mapContract.signer._address);
    let txn = await mapContract.mintNFT(
      convert(coordA),
      convert(coordB),
      convert(coordC),
      convert(coordD)
    );
    await txn.wait();
  };

  return (
    <div className="flex flex-col items-center">
      {signerData && (
        <button
          className="px-6 py-2 m-2 font-bold rounded-xl bg-violet-400 hover:bg-violet-600 transition-colors"
          onClick={() => mintNFT(coordA, coordB, coordC, coordD)}
        >
          Mint a new NFT
        </button>
      )}
    </div>
  );
};
