import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define environment variables with default values
export const config = {
  port: process.env.PORT || 5000,
  ethereum: {
    rpcUrl: process.env.ETHEREUM_RPC_URL || 'http://localhost:8545',
    nftContractAddress: process.env.NFT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    privateKey: process.env.PRIVATE_KEY || '0000000000000000000000000000000000000000000000000000000000000000',
  },
  aiService: {
    apiKey: process.env.AI_SERVICE_API_KEY || '',
    url: process.env.AI_SERVICE_URL || 'https://api.openai.com/v1/images/generations',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  }
};
