export interface NFT {
  id: string;
  tokenId: string;
  artId: string;
  owner: string;
  price: number;
  forSale: boolean;
  created: Date;
  transactionHash: string;
}

export interface NFTTransaction {
  id: string;
  tokenId: string;
  from: string;
  to: string;
  price: number;
  timestamp: Date;
  transactionHash: string;
  type: 'mint' | 'transfer' | 'sale';
}
