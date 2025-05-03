export interface ArtGenerationParams {
  style: string;
  colorScheme: string;
  complexity: number;
  theme: string;
}

export interface GeneratedArt {
  id: string;
  imageUrl: string;
  title: string;
  params: ArtGenerationParams;
  created: Date;
  minted: boolean;
}

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

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
}