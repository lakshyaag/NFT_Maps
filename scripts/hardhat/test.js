const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory("StateImages")
  const contract = await contractFactory.deploy()
  await contract.deployed()

  console.log("NFT contract deployed at:", contract.address)

  let img_url =
    "https://randomwordgenerator.com/img/picture-generator/54e3d54a4c53ac14f1dc8460962e33791c3ad6e04e5077497c2a7cd49149cc_640.jpg"
  let state_nft_id = 5

  let tx = await contract.addImage(state_nft_id, img_url)

  img_url =
    "https://randomwordgenerator.com/img/picture-generator/53e0d4464257ab14f1dc8460962e33791c3ad6e04e507440762a7cd0934fc5_640.jpg"
  state_nft_id = 6

  tx = await contract.addImage(state_nft_id, img_url)

  let uri = await contract.getStateNftToTokenURI(5)
  console.log(uri)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
