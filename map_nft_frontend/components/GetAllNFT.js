import { CONTRACT_ADDRESS } from "../constants/state/contractAddress"
import abi from "../constants/state/contractAbi.json"
import { useEffect, useState } from "react"
import { formatMapData } from "../utils/formatMapData"
import MapElement from "./MapElement"
import { ethers } from "ethers"
import { THIRDWEB_IPFS_CID } from "../constants/state/thirdWebIPFSCID"
import { BASE_IPFS } from "../constants/baseIPFS"

export default function GetAllNFT() {
  const provider = new ethers.providers.AlchemyProvider("maticmum")
  const [mapData, setMapData] = useState(null)

  const mapContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

  const totalSupply = async () => {
    const supplyClaimed = await mapContract.totalSupply()
    return supplyClaimed.toNumber()
  }

  const getTokenURI = async (tokenId) => {
    const metadata = await (
      await fetch(BASE_IPFS + THIRDWEB_IPFS_CID + tokenId)
    ).json()
    const metadataURI = metadata.attributes.uri.replace("ipfs://", "")

    const coordsData = await (await fetch(BASE_IPFS + metadataURI)).json()
    // console.log(coordsData)
    return coordsData
  }

  const getAllNFT = async () => {
    const supplyClaimed = await totalSupply()
    let mapData = []
    let imageData = []

    if (supplyClaimed > 0) {
      try {
        for (var i = 0; i < supplyClaimed; i++) {
          const coordData = await getTokenURI(i)
          // console.log(coordData)
          mapData.push(coordData)
        }
        const combinedMapData = formatMapData(mapData, imageData)
        setMapData(combinedMapData)
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    getAllNFT()
  }, [])

  return (
    <div className="flex flex-col">
      <MapElement nftBounds={mapData} />
    </div>
  )
}
