import { CONTRACT_ADDRESS } from "../constants/state/contractAddress"
import { STATE_IMAGE_CONTRACT_ADDRESS } from "../constants/state/stateImageContractAddress"
import { abi as stateAbi } from "../constants/state/stateImageContractAbi.json"
import abi from "../constants/state/contractAbi.json"
import { THIRDWEB_IPFS_CID } from "../constants/state/thirdWebIPFSCID"
import { BASE_IPFS } from "../constants/baseIPFS"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { Input, Select } from "web3uikit"

export default function UploadImage() {
  const { isWeb3Enabled, account } = useMoralis()

  const [balance, setBalance] = useState(null)
  const [tokenList, setTokenList] = useState([])
  const [imageURL, setImageURL] = useState(null)
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(null)
  const [selectedNFTMetadata, setSelectedNFTMetadata] = useState(null)

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

  const generateTokenList = () => {
    const tokens = []
    for (var i = 0; i < balance; i++) {
      tokens.push({
        id: i,
        label: "#" + i,
      })
    }
    setTokenList(tokens)
  }

  useEffect(() => {
    getUserBalance()
  }, [account])

  useEffect(() => {
    generateTokenList()
  }, [balance])

  const { runContractFunction: getUserNFTTokenId } = useWeb3Contract()

  const getTokenIdContractOptions = {
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "tokenOfOwnerByIndex",
    params: {
      owner: account,
    },
  }

  const { runContractFunction: getTokenUri } = useWeb3Contract()

  const getTokenUriOptions = {
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "tokenURI",
    params: {},
  }

  const { runContractFunction: mintStateImageNFT } = useWeb3Contract()

  const mintStateImageNFTOptions = {
    abi: stateAbi,
    contractAddress: STATE_IMAGE_CONTRACT_ADDRESS,
    functionName: "addImage",
    params: {},
  }

  const { runContractFunction: getStateImageNFTURI } = useWeb3Contract()

  const getStateImageNFTURIOptions = {
    abi: stateAbi,
    contractAddress: STATE_IMAGE_CONTRACT_ADDRESS,
    functionName: "getStateNftToTokenURI",
    params: {},
  }

  const getImageURI = async (tokenId) => {
    getStateImageNFTURIOptions.params.stateNftId = tokenId

    const stateImageURI = await getStateImageNFTURI({
      params: getStateImageNFTURIOptions,
    })

    return stateImageURI
  }

  const getTokenMetadata = async () => {
    if (selectedNFTIndex !== null) {
      getTokenIdContractOptions.params.index = selectedNFTIndex
      const userTokenId = await getUserNFTTokenId({
        params: getTokenIdContractOptions,
      })

      console.log(userTokenId)

      getTokenUriOptions.params._tokenId = userTokenId.toNumber()

      const selectedImageUrl = await getImageURI(userTokenId.toNumber())

      const tokenUri = await getTokenUri({ params: getTokenUriOptions })
      const metadata = await fetch(tokenUri.replace("ipfs://", BASE_IPFS)).then(
        (res) => res.json()
      )

      metadata.tokenId = userTokenId.toNumber()
      metadata.imageUrl = selectedImageUrl
      setSelectedNFTMetadata(metadata)
    }
  }

  useEffect(() => {
    getTokenMetadata()
  }, [selectedNFTIndex])

  const selectNFT = () => {
    return (
      <Select
        label="Select NFT"
        width="30%"
        onChange={(e) => {
          setSelectedNFTIndex(e.id)
        }}
        options={tokenList}
      />
    )
  }

  const showMetadata = () => {
    if (selectedNFTMetadata) {
      return (
        <div className="flex flex-row justify-items-center space-x-2 my-2 text-xl">
          <p className="font-bold">Selected NFT: </p>
          <p>{selectedNFTMetadata.tokenId}</p>
        </div>
      )
    }
  }

  const showImage = () => {
    if (selectedNFTMetadata?.imageUrl) {
      return (
        <div>
          <img
            className="object-cover h-48 w-96"
            src={selectedNFTMetadata.imageUrl}
          />
        </div>
      )
    }
  }

  const imageInput = () => {
    return (
      <>
        <Input
          label="Image URL"
          name="Add image URI"
          onChange={(e) => {
            setImageURL(e.target.value)
          }}
          prefixIcon="image"
          type="text"
          width="30%"
        />
        <p className="text-center font-bold">
          Only add links ending with PNG or JPEG.
        </p>
      </>
    )
  }

  const mintImageNFT = () => {
    const submitImage = async () => {
      mintStateImageNFTOptions.params.stateNftId = selectedNFTMetadata.tokenId
      mintStateImageNFTOptions.params.imageURL = imageURL

      const transaction = await mintStateImageNFT({
        params: mintStateImageNFTOptions,
      })

      console.log(transaction)
    }

    if (imageURL) {
      return (
        <div>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => submitImage().then()}
          >
            Add image!
          </button>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col justify-center my-4 p-2 items-center space-y-6">
      {selectNFT()}
      {selectedNFTMetadata && (
        <>
          {showMetadata()}
          {selectedNFTMetadata?.imageUrl ? (
            <>{showImage()}</>
          ) : (
            <>{imageInput()}</>
          )}
          {mintImageNFT()}
        </>
      )}
    </div>
  )
}
