import sdk from "./init-sdk.js"

const nftDrop = sdk.getNFTDrop(
  "0x854f0805dedb9df6a5B6B557F0714f5B19BC827A"
)

const getData = async (_tokenId) => {
  let data = await nftDrop.get("0")
  return data
}

const main = async () => {
  const data = (await getData())
  console.log(data)
}

main()
