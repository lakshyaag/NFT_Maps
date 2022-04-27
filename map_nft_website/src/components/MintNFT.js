import { useContract, useSigner } from "wagmi";
import { convert } from "../utils/convert";
import contractAbi from "../utils/mapNFT.json";
import { CONTRACT_ADDRESS } from "../utils/contractAddress";
import { useEffect, useState } from "react";

export const MintNFT = () => {
  const { data: signerData } = useSigner();

  const [balance, setBalance] = useState(null);

  const mapContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi.abi,
    signerOrProvider: signerData,
  });

  const addressBalance = async (address) => {
    console.log(address);
    if (address) {
      const balance = await mapContract.balanceOf(address);
      setBalance(balance.toNumber());
      return balance.toNumber();
    }
    return null;
  }

  let coordA = { long: -108.80859375, lat: 37.160316546 };
  let coordB = { long: -102.216796875, lat: 37.160316546 };
  let coordC = { long: -102.216796875, lat: 41.178653972 };
  let coordD = { long: -108.80859375, lat: 41.178653972 };
  let colorMint = "#b4bb71"

  const mintNFT = async (coordA, coordB, coordC, coordD, color) => {
    console.log("Signing with: ", mapContract.signer._address);
    let txn = await mapContract.mintNFT(
      convert(coordA),
      convert(coordB),
      convert(coordC),
      convert(coordD),
      color
    );
    await txn.wait();
  };

  console.log("Balance: ", balance);

  useEffect(() => {
    addressBalance(signerData?._address);
  }, [signerData?._address])

  return (
    <div className="flex flex-col items-center">
      {signerData && balance === 0 && (
        <button
          className="px-6 py-2 m-2 font-bold rounded-xl bg-violet-400 hover:bg-violet-600 transition-colors"
          onClick={() => mintNFT(coordA, coordB, coordC, coordD, colorMint)}
        >
          Mint a new NFT
        </button>
      )}
    </div>
  );
};
