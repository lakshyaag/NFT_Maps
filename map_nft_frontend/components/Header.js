import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
  return (
    <nav className="p-4 border-b-2 flex flex-row">
      <h1 className="py-2 px-4 font-bold text-3xl">Map NFT</h1>
      <div className="flex flex-row m-2 p-2 gap-4 align-middle justify-evenly">
        <Link href="/" className="mx-2">
          <a>States</a>
        </Link>
        <Link href="/county" className="mx-2">
          <a>Counties</a>
        </Link>
      </div>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  )
}
