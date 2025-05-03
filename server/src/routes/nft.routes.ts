import { Router } from 'express';
import * as NFTController from '../controllers/nft.controller';

const router = Router();

// Mint a new NFT
router.post('/mint', NFTController.mintNFT);

// Get all NFTs
router.get('/', NFTController.getAllNFTs);

// Get NFTs owned by a specific address
router.get('/owner/:address', NFTController.getNFTsByOwner);

// Get a specific NFT by token ID
router.get('/:tokenId', NFTController.getNFTByTokenId);

// List an NFT for sale
router.post('/:tokenId/list', NFTController.listNFTForSale);

// Buy an NFT
router.post('/:tokenId/buy', NFTController.buyNFT);

// Get transaction history for an NFT
router.get('/:tokenId/history', NFTController.getNFTHistory);

export default router;
