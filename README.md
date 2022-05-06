## Structure

- `/utils/data/`: This folder contains individual GeoJSON files for each NFT
- `scripts`
  - `init-sdk.js`: Initialize Thirdweb SDK
  - `upload_ipfs.mjs`: Upload GeoJSON files to IPFS storage via [NFT.Storage](http://nft.storage/)
  - `mint.js`: Mint individual NFTs with metadata pointing to corresponding IPFS URL
- `.env`: Environment file containing private information such as `PRIVATE_KEY`, `NFT_STORAGE_KEY`, `WALLET_ADDRESS`, `ALCHEMY_API_URL`

## Sample NFT Metadata

```json
{
  owner: '0xE4c98fc657736E22B9C2FeDF53A058b303bA2cFF',
  metadata: {
    name: 'Map NFT #6',
    description: 'This is a map NFT',
    id: BigNumber { _hex: '0x00', _isBigNumber: true },
    uri: 'ipfs://QmQ3FQsdMWi7ycF5FwuBonhaUYcm6PeHn2s3NkVLKvmH1M/0',
    attributes: {
      uri: 'https://gateway.ipfscdn.io/ipfs/bafybeibuby4n2ulydp2ip72ispexsxduhbfk4qz4vhet4xbwqjs7hwlbhu/6.json'
    }
  }
}
```

The top-level `uri` key points to the IPFS node containing the same metadata. The sub-level `attributes > uri` key points to the GeoJSON data for the corresponding NFT.
