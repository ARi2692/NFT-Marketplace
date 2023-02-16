// contracts/SimpleERC721.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// import "hardhat/console.sol";

contract NFTMarketPlace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    address payable owner;

    uint256 listingPrice = 0.00025 ether;

    uint256 MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    struct TokenOnMarketplace {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => TokenOnMarketplace) public marketplace;
    
    event idMarketItemCreated(uint256 indexed tokenId, address seller, address owner, uint256 price, bool sold);

    modifier onlyOwner() {
        require(msg.sender==owner, "Only for owner!");
        _;
    }

    constructor() ERC721("NftToken", "NFTT") {
        owner == payable (msg.sender);
    }

    function updateListingPrice(uint256 _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns(uint256) {
        return listingPrice;
    }


    function newItem(string memory tokenURI, uint256 price) public payable returns (uint256) {
        // require(royalty >= 0, "royalty must be greater than 0");
        // require(royalty < 100, "royalty must be less than 100");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, tokenURI);

        // TokenOnMarketplace memory tmp;
        // tmp.listing = false;
        // tmp.price = MAX_INT;
        // tmp.publisher = _msgSender();
        // tmp.royalty = royalty;

        // marketplace[newItemId] = tmp;

        createMarketItem(newItemId, price);

        return newItemId;
    }


    function createMarketItem(uint256 _tokenId, uint256 _price) private {
        require(_price>0, "price must be more than 0");
        require(msg.value==listingPrice, " price must be more than or equal to listing price");

        marketplace[_tokenId] = TokenOnMarketplace(
            _tokenId,
            payable(_msgSender()),
            payable(address(this)),
            _price,
            false
        );

        _transfer(msg.sender, address(this), _tokenId);

        emit idMarketItemCreated(_tokenId, msg.sender, address(this), _price, false);
    }


    function resellToken(uint256 _tokenId, uint256 _price) public payable {
        require(marketplace[_tokenId].owner==msg.sender, "only owner");
        require(msg.value==listingPrice, "price must be equal to listing price");

        marketplace[_tokenId].sold = false;
        marketplace[_tokenId].price = _price;
        marketplace[_tokenId].seller = payable(msg.sender);
        marketplace[_tokenId].owner = payable(address(this));

        _itemsSold.decrement();
        
        _transfer(msg.sender, address(this), _tokenId);
    }

    function createMarketSale(uint256 _tokenId) public payable {

        uint256 price  = marketplace[_tokenId].price;
        
        require(msg.value == price, " please submit the price in order to complete payment ");

        marketplace[_tokenId].owner = payable(msg.sender);
        marketplace[_tokenId].sold = true;
        // marketplace[_tokenId].owner = payable(address(0);

        _itemsSold.increment();

        _transfer(address(this), msg.sender, _tokenId);

        payable(owner).transfer(listingPrice);
        payable(marketplace[_tokenId].seller).transfer(msg.value);

    }

    function fetchMarketItem() public view returns(TokenOnMarketplace[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;
        TokenOnMarketplace[] memory items = new TokenOnMarketplace[](unsoldCount);
        for(uint256 i; i < itemCount; i++) {
            if (marketplace[i+1].owner==address(this)) {
                uint256 currentId = i + 1;
                TokenOnMarketplace storage currentItem = marketplace[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFT() public view returns(TokenOnMarketplace[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for(uint256 i; i < totalCount; i++) {
            if (marketplace[i+1].owner==msg.sender) {
                itemCount += 1;
            }
        }
        TokenOnMarketplace[] memory items = new TokenOnMarketplace[](itemCount);
        for (uint256 i; i < totalCount; i++) {
            if (marketplace[i+1].owner==msg.sender) {
                uint256 currentId = i + 1 ;
                TokenOnMarketplace storage currentItem = marketplace[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListed() public view returns(TokenOnMarketplace[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i; i < totalCount; i++) {
        if (marketplace[i+1].seller==msg.sender) {
            itemCount += 1;
        }
        }

        TokenOnMarketplace[] memory items = new TokenOnMarketplace[](itemCount);
        for (uint256 i; i < totalCount; i++) {
            if (marketplace[i+1].seller==msg.sender) {
                uint256 currentId = i + 1 ;
                TokenOnMarketplace storage currentItem = marketplace[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // function listOnMarketplace(uint256 _tokenId, uint256 _price) public {
    //     require(_exists(_tokenId), "listOnMarketplace: token not found");
    //     require(ownerOf(_tokenId) == msg.sender, "listOnMarketplace: only owner can list the token on marketplace");
    //     marketplace[_tokenId].listing = true;
    //     marketplace[_tokenId].price = _price;
    // }

    // function removeFromMarketplace(uint256 _tokenId) public {
    //     require(_exists(_tokenId), "removeFromMarketplace: token not found");
    //     require(ownerOf(_tokenId) == msg.sender, "removeFromMarketplace: only owner can remove the token from marketplace");
    //     marketplace[_tokenId].listing = false;
    //     marketplace[_tokenId].price = MAX_INT;
    // }

    // function purchase(uint256 _tokenId) public payable {
    //     require(_exists(_tokenId), "purchase: token not found");
    //     require(marketplace[_tokenId].listing, "purchase: the token is not listed");
    //     require(msg.value == marketplace[_tokenId].price, "purchase: the price is not correct");

    //     uint256 fee = (msg.value * marketplace[_tokenId].royalty) / 100;

    //     payable(marketplace[_tokenId].publisher).transfer(fee);
    //     payable(ownerOf(_tokenId)).transfer(msg.value - fee);

    //     _transfer(ownerOf(_tokenId), msg.sender, _tokenId);

    //     marketplace[_tokenId].listing = false;
    //     marketplace[_tokenId].price = MAX_INT;
    // }
}