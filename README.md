# Map NFT

## Structure

- `contracts`: Contains the Solidity smart contract
- `scripts`: Contains scripts to test and deploy smart contract using [Hardhat](https://hardhat.org/).
- `map_nft_website`: Code for the frontend

## How to run

1. Clone the project to your local directory
2. Run `npm install`
3. Create a `.env` file containing your `ALCHEMY_API_URL` and `PRIVATE_KEY` (if you wish to deploy your version of the smart contract)
4. Change the current directory to `map_nft_website/`
5. Run `npm install`
6. Create a `.env.local` containing `REACT_APP_MAPBOX_ACCESS_TOKEN`
7. Run `npm run start`

## Notes

- Metamask has to be installed in your browser and configured to run on the Mumbai Testnet. Click [here to go to the Mumbai testnet](https://mumbai.polygonscan.com/)
- If you want to deploy a new contract, you will need test MATIC in your wallet
- As I figure out minting and image upload, the structure of the project will change
