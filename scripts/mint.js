import sdk from "./init-sdk.js";

let coords = "ipfs://bafkreigncdffrm6nwe3wdjnq5dq42pztlcq4egfsl6lm42nn4vity34kqi"

const nftCollection = sdk.getNFTCollection('0x0d9093d8D9B011161c8058E5a91a0C6C70b0CB27')

const mint = async (coordsUrl) => {
    console.log(
        await nftCollection.mintToSelf({
            name: "Map NFT",
            attributes: {
                "coordsURL": coordsUrl
            }
        })
    )
}

mint(coords);