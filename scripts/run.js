const convertToUnsigned = (coordinates) => {
  const RESOLUTION = 1e9;

  let isWest = coordinates.long < 0;
  let isSouth = coordinates.lat < 0;

  return {
    long: Math.abs(coordinates.long) * RESOLUTION,
    lat: Math.abs(coordinates.lat) * RESOLUTION,
    isWest: isWest === true ? 1 : 0,
    isSouth: isSouth === true ? 1 : 0,
  };
};

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("mapNFT");
  const nftContract = await nftContractFactory.deploy();

  await nftContract.deployed();

  console.log("NFT contract deployed with address", nftContract.address);

  const [owner, addr1] = await hre.ethers.getSigners();

  // Coordinates
  let a = { long: -108.80859375, lat: 37.160316546 };
  let b = { long: -102.216796875, lat: 37.160316546 };
  let c = { long: -102.216796875, lat: 41.178653972 };
  let d = { long: -108.80859375, lat: 41.178653972 };
  let color = "#38cb2c"

  // NFT 1
  let txn = await nftContract.mintNFT(
    convertToUnsigned(a),
    convertToUnsigned(b),
    convertToUnsigned(c),
    convertToUnsigned(d),
    color
  );

  let uri = await nftContract.tokenURI(1);

  console.log(uri);

  let e = { long: 119.399414062, lat: -29.688052749 };
  let f = { long: 131.30859375, lat: -29.688052749 };
  let g = { long: 131.30859375, lat: -23.644524198 };
  let h = { long: 119.399414062, lat: -23.644524198 };
  color = "#b4bb71"

  // NFT 2
  txn = await nftContract.connect(addr1).mintNFT(
    convertToUnsigned(e),
    convertToUnsigned(f),
    convertToUnsigned(g),
    convertToUnsigned(h),
    color
  );

  uri = await nftContract.tokenURI(2);

  console.log(uri);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
