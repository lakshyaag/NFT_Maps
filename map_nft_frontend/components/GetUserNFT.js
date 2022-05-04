import { CONTRACT_ADDRESS } from "../constants/contractAddress"
import abi from "../constants/contractAbi.json"
import { useEffect, useState } from "react"
import { formatMapData } from "../utils/formatMapData"
import MapElement from "./MapElement"
import { useMoralis, useWeb3Contract } from "react-moralis"

export default function GetUserNFT() {
  const { isWeb3Enabled, account } = useMoralis()

  const [mapData, setMapData] = useState(null)
  const [balance, setBalance] = useState(null)

  const BASE_URL = "https://gateway.ipfscdn.io/ipfs/"

  const THIRDWEB_IPFS_CID = "QmRXYtnWwDgt9dKhMppmWghW9AHRmEfQSuDYPCYZWFZct2/"

  const { runContractFunction: getUserNFTBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    params: {
      owner: account,
    },
  })

  const getUserBalance = async () => {
    const balance = await getUserNFTBalance()
    setBalance(balance.toNumber())
  }

  const { runContractFunction: getUserNFTTokenId } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "tokenOfOwnerByIndex",
    params: {
      owner: account,
      index: 0,
    },
  })

  const getTokenURI = async (tokenId) => {
    const metadata = await (
      await fetch(BASE_URL + THIRDWEB_IPFS_CID + tokenId)
    ).json()
    const metadataURI = metadata.attributes.uri.replace("ipfs://", "")

    const coordsData = await (await fetch(BASE_URL + metadataURI)).json()
    // console.log(coordsJSON)
    return coordsData
  }

  const getMapData = async () => {
    if (balance > 0) {
      try {
        const userTokenId = await getUserNFTTokenId()
        const coordsData = await getTokenURI(userTokenId.toNumber())
        const formattedMapData = formatMapData([coordsData])
        setMapData(formattedMapData)
      } catch (e) {
        console.error(e)
      }
    } else {
      setMapData(null)
    }
  }

  console.log(mapData)

  useEffect(() => {
    getUserBalance()
    getMapData()
  }, [account, balance])

  return (
    <div className="flex flex-col">
      <MapElement nftBounds={mapData && mapData} />
    </div>
  )
}
