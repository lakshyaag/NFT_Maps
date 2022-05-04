import { CONTRACT_ADDRESS } from "../constants/contractAddress"
import abi from "../constants/contractAbi.json"
import { useEffect, useState } from "react"
import { formatMapData } from "../utils/formatMapData"
import MapElement from "./MapElement"
import { ethers } from "ethers"

export default function GetAllNFT() {
  const provider = new ethers.providers.AlchemyProvider("maticmum")
  const [mapData, setMapData] = useState(null)

  const BASE_URL = "https://gateway.ipfscdn.io/ipfs/"

  const THIRDWEB_IPFS_CID = "QmRXYtnWwDgt9dKhMppmWghW9AHRmEfQSuDYPCYZWFZct2/"

  const mapContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

  const totalSupply = async () => {
    const supplyClaimed = await mapContract.totalSupply()
    return supplyClaimed.toNumber()
  }

  const getTokenURI = async (tokenId) => {
    const metadata = await (
      await fetch(BASE_URL + THIRDWEB_IPFS_CID + tokenId)
    ).json()
    const metadataURI = metadata.attributes.uri.replace("ipfs://", "")

    const coordsData = await (await fetch(BASE_URL + metadataURI)).json()
    // console.log(coordsJSON)
    return coordsData
  }

  const getAllNFT = async () => {
    const supplyClaimed = await totalSupply()
    let mapData = []

    if (supplyClaimed > 0) {
      try {
        for (var i = 0; i < supplyClaimed; i++) {
          const coordData = await getTokenURI(i)
          console.log(coordData)
          mapData.push(coordData)
        }
        const combinedMapData = formatMapData(mapData)
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
