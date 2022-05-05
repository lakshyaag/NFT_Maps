import { CONTRACT_ADDRESS } from "../constants/contractAddress"
import abi from "../constants/contractAbi.json"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"

export default function MintNFT() {
  const { isWeb3Enabled, account } = useMoralis()
  const [balance, setBalance] = useState(null)

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
          window.open(
            "https://gateway.ipfscdn.io/ipfs/QmchGLcpfPcYtLkVytFX4tcb7pY5ZnjJpQkgZYWSaoWgDS/drop.html?contract=0x854f0805dedb9df6a5B6B557F0714f5B19BC827A&chainId=80001"
          )
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
