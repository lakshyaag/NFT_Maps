// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import {Base64} from "./libraries/Base64.sol";

/** @title Map NFT */
contract mapNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 private constant RESOLUTION = 1e9;

    /** @dev Coordinate structure
        @param long Longitude (0 to 180)
        @param lat Latitude (0 to 90)
        @param isWest 1 if longitude is west of the prime meridian, 0 otherwise
        @param isSouth 1 if latitude is south of the equator, 0 otherwise
     */
    struct Coordinate {
        uint256 long;
        uint256 lat;
        uint8 isWest;
        uint8 isSouth;
    }

    /** @dev Polygon structure
        @param a Coordinate A
        @param b Coordinate B
        @param c Coordinate C
        @param d Coordinate D
        @param color Color of the polygon
     */
    struct Polygon {
        Coordinate a;
        Coordinate b;
        Coordinate c;
        Coordinate d;
        string color;
    }

    mapping(uint256 => Polygon) public nftPolygon;

    mapping(address => uint256) public nftHolders;

    event newNftMinted(address sender, uint256 tokenId);

    constructor() ERC721("mapNFT", "MAP") {
        console.log("Map NFT contract created!");

        _tokenIds.increment();
    }

    /** @dev Mint NFT
        @param a Coordinate A
        @param b Coordinate B
        @param c Coordinate C
        @param d Coordinate D
        @param color Color of the polygon
     */
    function mintNFT(
        Coordinate calldata a,
        Coordinate calldata b,
        Coordinate calldata c,
        Coordinate calldata d,
        string memory color
    ) external {
        uint256 newItemId = _tokenIds.current();

        require(balanceOf(msg.sender) < 1, "You can only have one NFT!");

        _safeMint(msg.sender, newItemId);

        nftPolygon[newItemId] = Polygon(a, b, c, d, color);

        console.log(
            "A new NFT has been minted to %s with ID %s",
            msg.sender,
            newItemId
        );

        nftHolders[msg.sender] = (newItemId);

        _tokenIds.increment();

        emit newNftMinted(msg.sender, newItemId);
    }

    /** @dev Token URI
        @param _tokenId Token ID to get URI of
        @return Token URI of given token id
     */
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
                ', "color": "',
                polygon.color,
                '"},',
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

    /** @dev Check if caller has the NFT
        @return tokenID, if exists, else 0
     */
    function getUserNFT() public view returns (uint256) {
        uint256 userNftTokenId = nftHolders[msg.sender];
        return userNftTokenId;
    }
}
