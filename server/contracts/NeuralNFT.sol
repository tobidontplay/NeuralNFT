// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title NeuralNFT
 * @dev ERC721 token for AI-generated artwork with marketplace functionality
 */
contract NeuralNFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping from token ID to price
    mapping(uint256 => uint256) private _tokenPrices;
    
    // Mapping from token ID to whether it's for sale
    mapping(uint256 => bool) private _tokenForSale;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) private _tokenCreators;
    
    // Royalty percentage (in basis points, e.g., 250 = 2.5%)
    uint256 public royaltyPercentage = 250;
    
    // Platform fee percentage (in basis points)
    uint256 public platformFeePercentage = 250;
    
    // Events
    event NFTMinted(uint256 tokenId, address creator, string tokenURI);
    event NFTListedForSale(uint256 tokenId, uint256 price);
    event NFTSold(uint256 tokenId, address from, address to, uint256 price);
    event RoyaltyPaid(uint256 tokenId, address creator, uint256 amount);
    
    constructor() ERC721("NeuralNFT", "NNFT") {}
    
    /**
     * @dev Mints a new NFT token
     * @param recipient The address that will own the minted token
     * @param tokenURI The token URI for the NFT metadata
     * @return uint256 The ID of the newly minted token
     */
    function mintNFT(address recipient, string memory tokenURI) 
        public 
        returns (uint256) 
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        // Set the creator of the token
        _tokenCreators[newTokenId] = msg.sender;
        
        emit NFTMinted(newTokenId, msg.sender, tokenURI);
        
        return newTokenId;
    }
    
    /**
     * @dev Lists an NFT for sale
     * @param tokenId The ID of the token to list for sale
     * @param price The price in wei
     */
    function listForSale(uint256 tokenId, uint256 price) 
        public 
    {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        require(price > 0, "Price must be greater than zero");
        
        _tokenPrices[tokenId] = price;
        _tokenForSale[tokenId] = true;
        
        emit NFTListedForSale(tokenId, price);
    }
    
    /**
     * @dev Removes an NFT from sale
     * @param tokenId The ID of the token to remove from sale
     */
    function removeFromSale(uint256 tokenId) 
        public 
    {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        require(_tokenForSale[tokenId], "Token not for sale");
        
        _tokenForSale[tokenId] = false;
    }
    
    /**
     * @dev Buys an NFT
     * @param tokenId The ID of the token to buy
     */
    function buyNFT(uint256 tokenId) 
        public 
        payable 
        nonReentrant 
    {
        require(_exists(tokenId), "Token does not exist");
        require(_tokenForSale[tokenId], "Token not for sale");
        require(msg.value >= _tokenPrices[tokenId], "Insufficient funds");
        
        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "Cannot buy your own token");
        
        uint256 price = _tokenPrices[tokenId];
        
        // Calculate royalty if the seller is not the creator
        address creator = _tokenCreators[tokenId];
        uint256 royaltyAmount = 0;
        
        if (seller != creator) {
            royaltyAmount = (price * royaltyPercentage) / 10000;
        }
        
        // Calculate platform fee
        uint256 platformFee = (price * platformFeePercentage) / 10000;
        
        // Calculate amount to send to seller
        uint256 sellerAmount = price - royaltyAmount - platformFee;
        
        // Transfer the NFT to the buyer
        _transfer(seller, msg.sender, tokenId);
        
        // Mark as not for sale
        _tokenForSale[tokenId] = false;
        
        // Send payments
        if (royaltyAmount > 0) {
            payable(creator).transfer(royaltyAmount);
            emit RoyaltyPaid(tokenId, creator, royaltyAmount);
        }
        
        // Send platform fee to contract owner
        if (platformFee > 0) {
            payable(owner()).transfer(platformFee);
        }
        
        // Send remaining amount to seller
        payable(seller).transfer(sellerAmount);
        
        // Refund excess payment to buyer
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        
        emit NFTSold(tokenId, seller, msg.sender, price);
    }
    
    /**
     * @dev Checks if a token is for sale
     * @param tokenId The ID of the token to check
     * @return bool Whether the token is for sale
     */
    function isForSale(uint256 tokenId) 
        public 
        view 
        returns (bool) 
    {
        require(_exists(tokenId), "Token does not exist");
        return _tokenForSale[tokenId];
    }
    
    /**
     * @dev Gets the price of a token
     * @param tokenId The ID of the token to get the price for
     * @return uint256 The price of the token
     */
    function getPrice(uint256 tokenId) 
        public 
        view 
        returns (uint256) 
    {
        require(_exists(tokenId), "Token does not exist");
        return _tokenPrices[tokenId];
    }
    
    /**
     * @dev Gets the creator of a token
     * @param tokenId The ID of the token to get the creator for
     * @return address The address of the creator
     */
    function getCreator(uint256 tokenId) 
        public 
        view 
        returns (address) 
    {
        require(_exists(tokenId), "Token does not exist");
        return _tokenCreators[tokenId];
    }
    
    /**
     * @dev Sets the royalty percentage
     * @param percentage The new royalty percentage (in basis points)
     */
    function setRoyaltyPercentage(uint256 percentage) 
        public 
        onlyOwner 
    {
        require(percentage <= 1000, "Royalty cannot exceed 10%");
        royaltyPercentage = percentage;
    }
    
    /**
     * @dev Sets the platform fee percentage
     * @param percentage The new platform fee percentage (in basis points)
     */
    function setPlatformFeePercentage(uint256 percentage) 
        public 
        onlyOwner 
    {
        require(percentage <= 1000, "Platform fee cannot exceed 10%");
        platformFeePercentage = percentage;
    }
}
