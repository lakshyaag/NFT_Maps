import { useMoralis } from "react-moralis"
import Header from "../components/Header"
import UploadImage from "../components/UploadImage"

export default function ImagePage() {
  const { isWeb3Enabled, account } = useMoralis()
  return (
    <div>
      <Header />
      {isWeb3Enabled && account ? (
        <UploadImage />
      ) : (
        <p className="text-2xl my-2 font-bold text-center">
          Please connect Metamask!
        </p>
      )}
    </div>
  )
}
