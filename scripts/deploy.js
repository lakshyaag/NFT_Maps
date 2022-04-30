/** @dev Convert coordinate structure to solidity uint256
    @param coordiantes Object containing latitude and longitude in degrees
    @return Object containing latitude and longitude in uint256, isWest and isSouth in uint8
*/
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

  console.log("NFT contract deployed at:", nftContract.address);

  // Coordinates
  // let a = { long: -108.80859375, lat: 37.160316546 };
  // let b = { long: -102.216796875, lat: 37.160316546 };
  // let c = { long: -102.216796875, lat: 41.178653972 };
  // let d = { long: -108.80859375, lat: 41.178653972 };

  // // NFT 1
  // let txn = await nftContract.mintNFT(
  //   convertToUnsigned(a),
  //   convertToUnsigned(b),
  //   convertToUnsigned(c),
  //   convertToUnsigned(d),
  //   color
  // );

  // await txn.wait();

  let e = { long: 119.399414062, lat: -29.688052749 };
  let f = { long: 131.30859375, lat: -29.688052749 };
  let g = { long: 131.30859375, lat: -23.644524198 };
  let h = { long: 119.399414062, lat: -23.644524198 };
  let color = "#38cb2c"
  // NFT 2
  let txn = await nftContract.mintNFT(
    convertToUnsigned(e),
    convertToUnsigned(f),
    convertToUnsigned(g),
    convertToUnsigned(h),
    color
  );

  await txn.wait();

  // let supply = await nftContract.totalSupply();
  // console.log(supply.toNumber());

  // for (var i = 1; i <= supply.toNumber(); i++) {
  //   let uri = await nftContract.tokenURI(i);
  //   console.log(i, uri);
  // }

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
