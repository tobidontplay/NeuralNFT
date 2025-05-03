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
