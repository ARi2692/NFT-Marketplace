export const networkConfig = {

    "137": [
        {
            nftAddress: "", //proxy deployment
            nftMarketplaceAddress: "",//proxy
            networkName: "Polygon mainnet"
        },
    ],
    "80001": [
        {
            nftAddress: "0x8ED36D4f47f34598885f193836f9272Cf645BAa8", //proxy deployment
            nftMarketplaceAddress: "0xeeec05B055a87100DC20ED398E403ed94d75B71A",//proxy
            networkName: "Mumbai Testnet"
        },
    ],
}

export const getConfigByChain = (chain) => networkConfig[chain]