import { GeneratedArt, NFT, ArtGenerationParams } from '../types/types';
import { generateArtSVG, svgToDataURL } from './artGenerator';

// Mock art styles for the generator
export const artStyles = [
  'Abstract',
  'Cubism',
  'Impressionism',
  'Pixel Art',
  'Surrealism',
  'Minimalism',
  'Vaporwave',
  'Cyberpunk',
  'Pop Art',
  'Watercolor',
];

// Mock color schemes
export const colorSchemes = [
  'Vibrant',
  'Pastel',
  'Monochrome',
  'Neon',
  'Earth Tones',
  'Synthwave',
  'Dark Mode',
  'Retro',
];

// Mock themes
export const themes = [
  'Nature',
  'Cityscape',
  'Space',
  'Underwater',
  'Abstract Geometry',
  'Futuristic',
  'Fantasy',
  'Vintage',
  'Dreamscape',
];

// Mock generated artwork
export const mockArtworks: GeneratedArt[] = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png',
    title: 'Digital Dreamscape',
    params: {
      style: 'Abstract',
      colorScheme: 'Vibrant',
      complexity: 0.8,
      theme: 'Dreamscape',
    },
    created: new Date('2025-01-05'),
    minted: true,
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg',
    title: 'Neon City Nights',
    params: {
      style: 'Cyberpunk',
      colorScheme: 'Neon',
      complexity: 0.9,
      theme: 'Cityscape',
    },
    created: new Date('2025-01-10'),
    minted: true,
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/3222255/pexels-photo-3222255.png',
    title: 'Cosmic Geometry',
    params: {
      style: 'Minimalism',
      colorScheme: 'Monochrome',
      complexity: 0.5,
      theme: 'Space',
    },
    created: new Date('2025-01-15'),
    minted: false,
  },
  {
    id: '4',
    imageUrl: 'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg',
    title: 'Wave Synthesis',
    params: {
      style: 'Vaporwave',
      colorScheme: 'Synthwave',
      complexity: 0.7,
      theme: 'Abstract Geometry',
    },
    created: new Date('2025-01-20'),
    minted: false,
  },
  {
    id: '5',
    imageUrl: 'https://images.pexels.com/photos/8107191/pexels-photo-8107191.jpeg',
    title: 'Digital Flora',
    params: {
      style: 'Impressionism',
      colorScheme: 'Pastel',
      complexity: 0.6,
      theme: 'Nature',
    },
    created: new Date('2025-01-25'),
    minted: false,
  },
];

// Mock NFTs that have been minted
export const mockNFTs: NFT[] = [
  {
    id: '1',
    tokenId: '0x1a2b3c',
    artId: '1',
    owner: '0x1a2b3c4d5e6f',
    price: 0.15,
    forSale: true,
    created: new Date('2025-01-06'),
    transactionHash: '0xabcdef1234567890',
  },
  {
    id: '2',
    tokenId: '0x2b3c4d',
    artId: '2',
    owner: '0x1a2b3c4d5e6f',
    price: 0.25,
    forSale: false,
    created: new Date('2025-01-11'),
    transactionHash: '0x1234567890abcdef',
  },
];

// Function to generate art titles based on parameters
function generateArtTitle(params: ArtGenerationParams): string {
  const adjectives = {
    Abstract: ['Ethereal', 'Dynamic', 'Fluid'],
    Cubism: ['Geometric', 'Angular', 'Fractured'],
    Impressionism: ['Dreamy', 'Subtle', 'Luminous'],
    'Pixel Art': ['Retro', '8-Bit', 'Digital'],
    Surrealism: ['Enigmatic', 'Mystical', 'Dreamlike'],
    Minimalism: ['Pure', 'Essential', 'Refined'],
    Vaporwave: ['Nostalgic', 'Glitch', 'Wave'],
    Cyberpunk: ['Neon', 'Cyber', 'Tech'],
    'Pop Art': ['Bold', 'Iconic', 'Vibrant'],
    Watercolor: ['Flowing', 'Organic', 'Soft'],
  };

  const themeWords = {
    Nature: ['Garden', 'Forest', 'Bloom'],
    Cityscape: ['Urban', 'Metro', 'City'],
    Space: ['Cosmic', 'Stellar', 'Nebula'],
    Underwater: ['Aquatic', 'Ocean', 'Marine'],
    'Abstract Geometry': ['Form', 'Shape', 'Pattern'],
    Futuristic: ['Future', 'Tomorrow', 'Beyond'],
    Fantasy: ['Mythical', 'Magic', 'Dream'],
    Vintage: ['Retro', 'Classic', 'Timeless'],
    Dreamscape: ['Vision', 'Dream', 'Ethereal'],
  };

  const styleAdj = adjectives[params.style as keyof typeof adjectives] || adjectives.Abstract;
  const themeWord = themeWords[params.theme as keyof typeof themeWords] || themeWords.Nature;

  const adj = styleAdj[Math.floor(Math.random() * styleAdj.length)];
  const noun = themeWord[Math.floor(Math.random() * themeWord.length)];

  return `${adj} ${noun} #${Math.floor(Math.random() * 1000)}`;
}

// Function to simulate AI art generation
export const generateArt = async (params: ArtGenerationParams): Promise<GeneratedArt> => {
  // Generate SVG art
  const svg = generateArtSVG(params);
  const imageUrl = svgToDataURL(svg);
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    imageUrl,
    title: generateArtTitle(params),
    params,
    created: new Date(),
    minted: false,
  };
};

// Function to simulate NFT minting
export const mintNFT = (art: GeneratedArt): Promise<NFT> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNFT: NFT = {
        id: Math.random().toString(36).substring(2, 9),
        tokenId: '0x' + Math.random().toString(16).substring(2, 8),
        artId: art.id,
        owner: '0x1a2b3c4d5e6f', // Mock wallet address
        price: parseFloat((Math.random() * 0.3 + 0.1).toFixed(2)),
        forSale: false,
        created: new Date(),
        transactionHash: '0x' + Math.random().toString(16).substring(2, 34),
      };
      
      resolve(newNFT);
    }, 3000); // Simulate blockchain transaction time
  });
};