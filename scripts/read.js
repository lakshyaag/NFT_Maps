import sdk from "./init-sdk.js"

const CONTRACT_ADDRESS = "0xAA25a91f507a0A2ED9c6161EAEe68F2Aa0B5E96A"

const nftDrop = sdk.getNFTDrop(CONTRACT_ADDRESS)

const getData = async (_tokenId) => {
  let data = await nftDrop.get("0")
  return data
}

const main = async () => {
  const data = (await getData())
  console.log(data)
}

main()
