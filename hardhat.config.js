require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.13",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/l97hvFQjAyRKAjkc9rAttTFuIpJpHODm",
      accounts: ['980a561b40432c34adbce8dea75486c1b6084bc03600eca44b5dfd639502381f']
    }
  }
};
