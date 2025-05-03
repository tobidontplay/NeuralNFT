import { Request, Response } from 'express';
import { ethers, isAddress } from 'ethers';
import * as NFTService from '../services/nft.service';
import * as ArtService from '../services/art.service';
import { NFT } from '../models/nft.model';

/**
 * Mint a new NFT
 */
export const mintNFT = async (req: Request, res: Response) => {
  try {
    const { artId, walletAddress, signature } = req.body;
    
    if (!artId || !walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    // Get the artwork to mint
    const artwork = await ArtService.getArtworkById(artId);
    
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }
    
    if (artwork.minted) {
      return res.status(400).json({
        success: false,
        message: 'Artwork has already been minted'
      });
    }
    
    // Verify wallet signature (in production)
    // This is a placeholder for actual signature verification
    
    // Mint NFT on blockchain
    const nft = await NFTService.mintNFT(artwork, walletAddress);
    
    // Update artwork to mark as minted
    await ArtService.updateArtwork(artId, { minted: true });
    
    return res.status(201).json({
      success: true,
      data: nft
    });
  } catch (error: any) {
    console.error('Error minting NFT:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error minting NFT'
    });
  }
};

/**
 * Get all NFTs
 */
export const getAllNFTs = async (req: Request, res: Response) => {
  try {
    const nfts = await NFTService.getAllNFTs();
    
    return res.status(200).json({
      success: true,
      data: nfts
    });
  } catch (error: any) {
    console.error('Error fetching NFTs:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching NFTs'
    });
  }
};

/**
 * Get NFTs owned by a specific address
 */
export const getNFTsByOwner = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    if (!address || !isAddress(address)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid wallet address'
      });
    }
    
    const nfts = await NFTService.getNFTsByOwner(address);
    
    return res.status(200).json({
      success: true,
      data: nfts
    });
  } catch (error: any) {
    console.error('Error fetching NFTs by owner:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching NFTs by owner'
    });
  }
};

/**
 * Get a specific NFT by token ID
 */
export const getNFTByTokenId = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    
    if (!tokenId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token ID'
      });
    }
    
    const nft = await NFTService.getNFTByTokenId(tokenId);
    
    if (!nft) {
      return res.status(404).json({
        success: false,
        message: 'NFT not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: nft
    });
  } catch (error: any) {
    console.error('Error fetching NFT:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching NFT'
    });
  }
};

/**
 * List an NFT for sale
 */
export const listNFTForSale = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    const { price, walletAddress, signature } = req.body;
    
    if (!tokenId || !price || !walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    // Get the NFT
    const nft = await NFTService.getNFTByTokenId(tokenId);
    
    if (!nft) {
      return res.status(404).json({
        success: false,
        message: 'NFT not found'
      });
    }
    
    // Verify ownership
    if (nft.owner.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this NFT'
      });
    }
    
    // List NFT for sale
    const updatedNFT = await NFTService.listNFTForSale(tokenId, price);
    
    return res.status(200).json({
      success: true,
      data: updatedNFT
    });
  } catch (error: any) {
    console.error('Error listing NFT for sale:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error listing NFT for sale'
    });
  }
};

/**
 * Buy an NFT
 */
export const buyNFT = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    const { buyerAddress, signature } = req.body;
    
    if (!tokenId || !buyerAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    // Get the NFT
    const nft = await NFTService.getNFTByTokenId(tokenId);
    
    if (!nft) {
      return res.status(404).json({
        success: false,
        message: 'NFT not found'
      });
    }
    
    if (!nft.forSale) {
      return res.status(400).json({
        success: false,
        message: 'NFT is not for sale'
      });
    }
    
    // Process the purchase
    const updatedNFT = await NFTService.buyNFT(tokenId, buyerAddress);
    
    return res.status(200).json({
      success: true,
      data: updatedNFT
    });
  } catch (error: any) {
    console.error('Error buying NFT:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error buying NFT'
    });
  }
};

/**
 * Get transaction history for an NFT
 */
export const getNFTHistory = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    
    if (!tokenId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token ID'
      });
    }
    
    const history = await NFTService.getNFTHistory(tokenId);
    
    return res.status(200).json({
      success: true,
      data: history
    });
  } catch (error: any) {
    console.error('Error fetching NFT history:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching NFT history'
    });
  }
};
