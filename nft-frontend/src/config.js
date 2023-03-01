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
            nftAddress: "0xdBC241D0240Bf710C93F790afC9fe4b3c0C2b23D", //proxy deployment
            nftMarketplaceAddress: "0x06bd9d097aA994A2c9dB7b01821A2F7C1248fF39",//proxy
            networkName: "Mumbai Testnet"
        },
    ],
}

// 0x8ED36D4f47f34598885f193836f9272Cf645BAa8
// 0xeeec05B055a87100DC20ED398E403ed94d75B71A

export const getConfigByChain = (chain) => networkConfig[chain]