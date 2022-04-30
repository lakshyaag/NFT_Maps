import { useEffect } from "react";
import { useAccount, useContract, useProvider } from "wagmi";
import { combineMapData } from "../utils/combineMapData";
import contractAbi from "../utils/mapNFT.json";
import { parseData } from "../utils/parseData";
import { CONTRACT_ADDRESS } from "../utils/contractAddress";

export const GetAllNFT = ({ setMapData }) => {

  const provider = useProvider({ chainId: 80001 }); // to be changed when deployed on mainnet
  const { data: accountData } = useAccount();


  // Create the contract object
  const mapContract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi.abi,
    signerOrProvider: provider
  });

  const totalSupply = async () => {
    // Call totalSupply on the contract
    // https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Enumerable-totalSupply--
    const supply = await mapContract.totalSupply();
    return supply.toNumber();
  }

  const getTokenUri = async (tokenId) => {
    // Call tokenURI on given token id
    // https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721Metadata-tokenURI-uint256-
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
        // Iterate over total supply
        for (var i = 1; i <= supply; i++) {

          const uriData = await getTokenUri(i);
          // Send token URI data for parsing
          const parsedMapData = parseData(uriData);
          mapData.push(parsedMapData);
        }
        // Combine map data into one GeoJSON block
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

  useEffect(() => {
    accountData?.address === undefined && getAllNFT();
  }, [accountData])

  return (
    <>

    </>
  )
};
