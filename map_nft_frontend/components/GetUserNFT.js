import { CONTRACT_ADDRESS } from "../constants/contractAddress"
import abi from "../constants/contractAbi.json"
import { useEffect, useState } from "react"
import { formatMapData } from "../utils/formatMapData"
import MapElement from "./MapElement"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { THIRDWEB_IPFS_CID } from "../constants/thirdWebIPFSCID"
import { BASE_IPFS } from "../constants/baseIPFS"

export default function GetUserNFT() {
  const { isWeb3Enabled, account } = useMoralis()

  const [mapData, setMapData] = useState(null)
  const [balance, setBalance] = useState(null)

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
      await fetch(BASE_IPFS + THIRDWEB_IPFS_CID + tokenId)
    ).json()
    const metadataURI = metadata.attributes.uri.replace("ipfs://", "")

    const coordsData = await (await fetch(BASE_IPFS + metadataURI)).json()
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
    }
  }

  // console.log(mapData)

  useEffect(() => {
    getUserBalance()
    getMapData()
  }, [account, balance])

  return (
    <div className="flex flex-col">
      <MapElement nftBounds={mapData} />
    </div>
  )
}
