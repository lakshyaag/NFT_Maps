// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import {Base64} from "./libraries/Base64.sol";

contract mapNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 private constant RESOLUTION = 1e9;

    struct Coordinate {
        uint256 long;
        uint256 lat;
        uint8 isWest;
        uint8 isSouth;
    }

    struct Polygon {
        Coordinate a;
        Coordinate b;
        Coordinate c;
        Coordinate d;
    }

    mapping(uint256 => Polygon) public nftPolygon;

    mapping(address => uint256) public nftHolders;

    event newNftMinted(address sender, uint256 tokenId);

    constructor() ERC721("mapNFT", "MAP") {
        console.log("Map NFT contract created!");

        _tokenIds.increment();
    }

    function mintNFT(
        Coordinate calldata a,
        Coordinate calldata b,
        Coordinate calldata c,
        Coordinate calldata d
    ) external {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        nftPolygon[newItemId] = Polygon(a, b, c, d);

        console.log(
            "A new NFT has been minted to %s with ID %s",
            msg.sender,
            newItemId
        );

        nftHolders[msg.sender] = (newItemId);

        _tokenIds.increment();

        emit newNftMinted(msg.sender, newItemId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        Polygon memory polygon = nftPolygon[_tokenId];

        bytes memory coordinateJson = abi.encodePacked(
            '"geometry": {"type": "Polygon", "coordinates": [[[',
            Strings.toString(polygon.a.long),
            ",",
            Strings.toString(polygon.a.lat),
            "], [",
            Strings.toString(polygon.b.long),
            ",",
            Strings.toString(polygon.b.lat),
            "], [",
            Strings.toString(polygon.c.long),
            ",",
            Strings.toString(polygon.c.lat),
            "], [",
            Strings.toString(polygon.d.long),
            ",",
            Strings.toString(polygon.d.lat),
            "], [",
            Strings.toString(polygon.a.long),
            ",",
            Strings.toString(polygon.a.lat),
            "]]]}}]"
        );

        bytes memory hemisphereJson = abi.encodePacked(
            '"isWest": [',
            Strings.toString(polygon.a.isWest),
            ",",
            Strings.toString(polygon.b.isWest),
            ",",
            Strings.toString(polygon.c.isWest),
            ",",
            Strings.toString(polygon.d.isWest),
            ",",
            Strings.toString(polygon.a.isWest),
            "],",
            '"isSouth": [',
            Strings.toString(polygon.a.isSouth),
            ",",
            Strings.toString(polygon.b.isSouth),
            ",",
            Strings.toString(polygon.c.isSouth),
            ",",
            Strings.toString(polygon.d.isSouth),
            ",",
            Strings.toString(polygon.a.isSouth),
            "]"
        );

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"type": "FeatureCollection", "features": [{"type": "Feature", "properties": { "name": "Map NFT #',
                Strings.toString(_tokenId),
                '", "id": ',
                Strings.toString(_tokenId),
                "},",
                coordinateJson,
                ",",
                hemisphereJson,
                "}"
            )
        );

        string memory uri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return uri;
    }

    function getUserNFT() public view returns (uint256) {
        uint256 userNftTokenId = nftHolders[msg.sender];
        return userNftTokenId;
    }
}
