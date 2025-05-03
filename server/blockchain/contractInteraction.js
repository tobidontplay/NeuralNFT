const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Load contract data
const contractAddressFile = path.join(__dirname, '../contractData/contract-address.json');
const contractArtifactFile = path.join(__dirname, '../contractData/NeuralNFT.json');

let contractAddress;
let contractABI;

try {
  const addressData = JSON.parse(fs.readFileSync(contractAddressFile));
  contractAddress = addressData.NeuralNFT;
  
  const artifactData = JSON.parse(fs.readFileSync(contractArtifactFile));
  contractABI = artifactData.abi;
} catch (error) {
  console.error('Error loading contract data:', error);
  process.exit(1);
}

// Connect to local Hardhat network
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Get the first account as the default signer
let defaultSigner;

// Initialize contract instance
let artifyNFTContract;

// Initialize blockchain connection
async function initBlockchain() {
  try {
    const signers = await provider.listAccounts();
    defaultSigner = provider.getSigner(signers[0]);
    
    // Create contract instance
    artifyNFTContract = new ethers.Contract(
      contractAddress,
      contractABI,
      defaultSigner
    );
    
    console.log('Blockchain connection initialized');
    console.log('Contract address:', contractAddress);
    console.log('Default account:', signers[0]);
    
    return true;
  } catch (error) {
    console.error('Error initializing blockchain connection:', error);
    return false;
  }
}

// Mint a new NFT
async function mintNFT(recipient, tokenURI) {
  try {
    const tx = await artifyNFTContract.mintNFT(recipient, tokenURI);
    const receipt = await tx.wait();
    
    // Get the token ID from the event
    const event = receipt.events.find(event => event.event === 'NFTMinted');
    const tokenId = event.args.tokenId.toString();
    
    return {
      success: true,
      tokenId,
      transactionHash: receipt.transactionHash,
      owner: recipient
    };
  } catch (error) {
    console.error('Error minting NFT:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// List an NFT for sale
async function listNFTForSale(tokenId, price, walletAddress) {
  try {
    // Connect with the owner's wallet
    const signer = provider.getSigner(walletAddress);
    const contractWithSigner = artifyNFTContract.connect(signer);
    
    // Convert price from ETH to wei
    const priceInWei = ethers.utils.parseEther(price.toString());
    
    const tx = await contractWithSigner.listForSale(tokenId, priceInWei);
    const receipt = await tx.wait();
    
    return {
      success: true,
      tokenId,
      price,
      transactionHash: receipt.transactionHash
    };
  } catch (error) {
    console.error('Error listing NFT for sale:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Buy an NFT
async function buyNFT(tokenId, buyerAddress) {
  try {
    // Get the price
    const priceInWei = await artifyNFTContract.getPrice(tokenId);
    
    // Connect with the buyer's wallet
    const signer = provider.getSigner(buyerAddress);
    const contractWithSigner = artifyNFTContract.connect(signer);
    
    // Buy the NFT
    const tx = await contractWithSigner.buyNFT(tokenId, {
      value: priceInWei
    });
    const receipt = await tx.wait();
    
    return {
      success: true,
      tokenId,
      price: ethers.utils.formatEther(priceInWei),
      transactionHash: receipt.transactionHash
    };
  } catch (error) {
    console.error('Error buying NFT:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Get all NFTs owned by an address
async function getNFTsByOwner(ownerAddress) {
  try {
    // This is a simplified approach since the contract doesn't have a direct method to get all NFTs by owner
    // In a production environment, you would use events or a more sophisticated approach
    
    // Get the total number of tokens
    const totalTokens = await artifyNFTContract._tokenIds();
    const ownedTokens = [];
    
    // Check each token to see if it's owned by the given address
    for (let i = 1; i <= totalTokens; i++) {
      try {
        const owner = await artifyNFTContract.ownerOf(i);
        if (owner.toLowerCase() === ownerAddress.toLowerCase()) {
          const tokenURI = await artifyNFTContract.tokenURI(i);
          const isForSale = await artifyNFTContract.isForSale(i);
          let price = '0';
          
          if (isForSale) {
            const priceInWei = await artifyNFTContract.getPrice(i);
            price = ethers.utils.formatEther(priceInWei);
          }
          
          ownedTokens.push({
            tokenId: i.toString(),
            owner,
            tokenURI,
            isForSale,
            price
          });
        }
      } catch (error) {
        // Token might not exist or other error
        continue;
      }
    }
    
    return {
      success: true,
      tokens: ownedTokens
    };
  } catch (error) {
    console.error('Error getting NFTs by owner:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Get wallet balance
async function getWalletBalance(address) {
  try {
    const balance = await provider.getBalance(address);
    return {
      success: true,
      balance: ethers.utils.formatEther(balance)
    };
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  initBlockchain,
  mintNFT,
  listNFTForSale,
  buyNFT,
  getNFTsByOwner,
  getWalletBalance,
  provider
};
