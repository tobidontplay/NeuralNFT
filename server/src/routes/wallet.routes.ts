import { Router } from 'express';
import * as WalletController from '../controllers/wallet.controller';

const router = Router();

// Get wallet balance
router.get('/balance/:address', WalletController.getWalletBalance);

// Get wallet transaction history
router.get('/transactions/:address', WalletController.getWalletTransactions);

// Verify wallet signature
router.post('/verify', WalletController.verifyWalletSignature);

// Get gas price estimate
router.get('/gas-price', WalletController.getGasPrice);

export default router;
