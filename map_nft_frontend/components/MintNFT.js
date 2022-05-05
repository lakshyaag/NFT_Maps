import { CONTRACT_ADDRESS } from "../constants/contractAddress"
import abi from "../constants/contractAbi.json"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { BASE_IPFS } from "../constants/baseIPFS"
import { THIRDWEB_IPFS_CID } from "../constants/thirdWebIPFSCID"

export default function MintNFT() {
  const { isWeb3Enabled, account } = useMoralis()
  const [balance, setBalance] = useState(null)

  const mintURL =
    BASE_IPFS + THIRDWEB_IPFS_CID + "drop.html?contract=" + CONTRACT_ADDRESS + "&chainId=80001"

  const { runContractFunction: getUserBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    params: {
      owner: account,
    },
  })

  const mintComponent = () => {
    return (
      <button
        className="p-2 m-2 font-bold rounded-xl bg-purple-400"
        onClick={() => {
          window.open(mintURL)
        }}
      >
        Mint NFT!
      </button>
    )
  }

  const getUserNFTBalance = async () => {
    const balance = await getUserBalance()
    setBalance(balance.toNumber())
  }

  console.log("NFT balance: ", balance)

  useEffect(() => {
    getUserNFTBalance()
  }, [account])

  return (
    <div className="flex flex-col items-center">
      {isWeb3Enabled && balance === 0 && <div>{mintComponent()}</div>}
    </div>
  )
}
