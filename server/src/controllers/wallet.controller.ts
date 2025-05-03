import { Request, Response } from 'express';
import { ethers, isAddress } from 'ethers';
import * as WalletService from '../services/wallet.service';

/**
 * Get wallet balance
 */
export const getWalletBalance = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    if (!address || !isAddress(address)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid wallet address'
      });
    }
    
    const balance = await WalletService.getWalletBalance(address);
    
    return res.status(200).json({
      success: true,
      data: {
        address,
        balance
      }
    });
  } catch (error: any) {
    console.error('Error fetching wallet balance:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching wallet balance'
    });
  }
};

/**
 * Get wallet transaction history
 */
export const getWalletTransactions = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    if (!address || !isAddress(address)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid wallet address'
      });
    }
    
    const transactions = await WalletService.getWalletTransactions(address);
    
    return res.status(200).json({
      success: true,
      data: transactions
    });
  } catch (error: any) {
    console.error('Error fetching wallet transactions:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching wallet transactions'
    });
  }
};

/**
 * Verify wallet signature
 */
export const verifyWalletSignature = async (req: Request, res: Response) => {
  try {
    const { address, message, signature } = req.body;
    
    if (!address || !message || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    const isValid = await WalletService.verifySignature(address, message, signature);
    
    return res.status(200).json({
      success: true,
      data: {
        isValid
      }
    });
  } catch (error: any) {
    console.error('Error verifying signature:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error verifying signature'
    });
  }
};

/**
 * Get gas price estimate
 */
export const getGasPrice = async (req: Request, res: Response) => {
  try {
    const gasPrice = await WalletService.getGasPrice();
    
    return res.status(200).json({
      success: true,
      data: gasPrice
    });
  } catch (error: any) {
    console.error('Error fetching gas price:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching gas price'
    });
  }
};
