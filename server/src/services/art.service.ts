import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ArtGenerationParams, GeneratedArt } from '../models/art.model';
import { generateArtSVG, svgToDataURL } from '../utils/artGenerator';

// In-memory storage for generated art (replace with database in production)
let generatedArtworks: GeneratedArt[] = [];

/**
 * Generate art using AI model
 * In a production environment, this would call an actual AI service API
 */
export const generateArtWithAI = async (params: ArtGenerationParams): Promise<GeneratedArt> => {
  try {
    // For now, we'll use our mock SVG generator
    // In production, this would be replaced with a call to an AI model API
    
    // Generate SVG art
    const svg = generateArtSVG(params);
    const imageUrl = svgToDataURL(svg);
    
    // In production, you would call an actual AI service:
    // const response = await axios.post('https://your-ai-service-url/generate', params);
    // const imageUrl = response.data.imageUrl;
    
    const generatedArt: GeneratedArt = {
      id: uuidv4(),
      imageUrl,
      title: generateArtTitle(params),
      params,
      created: new Date(),
      minted: false
    };
    
    // Save to storage
    generatedArtworks.push(generatedArt);
    
    return generatedArt;
  } catch (error) {
    console.error('Error in AI art generation:', error);
    throw new Error('Failed to generate artwork with AI');
  }
};

/**
 * Get all artworks
 */
export const getAllArtworks = async (): Promise<GeneratedArt[]> => {
  // In production, this would fetch from a database
  return generatedArtworks;
};

/**
 * Get artwork by ID
 */
export const getArtworkById = async (id: string): Promise<GeneratedArt | null> => {
  // In production, this would fetch from a database
  const artwork = generatedArtworks.find(art => art.id === id);
  return artwork || null;
};

/**
 * Save artwork
 */
export const saveArtwork = async (artwork: GeneratedArt): Promise<GeneratedArt> => {
  // In production, this would save to a database
  generatedArtworks.push(artwork);
  return artwork;
};

/**
 * Update artwork
 */
export const updateArtwork = async (id: string, updates: Partial<GeneratedArt>): Promise<GeneratedArt | null> => {
  // In production, this would update in a database
  const index = generatedArtworks.findIndex(art => art.id === id);
  
  if (index === -1) {
    return null;
  }
  
  generatedArtworks[index] = {
    ...generatedArtworks[index],
    ...updates
  };
  
  return generatedArtworks[index];
};

/**
 * Delete artwork
 */
export const deleteArtwork = async (id: string): Promise<boolean> => {
  // In production, this would delete from a database
  const initialLength = generatedArtworks.length;
  generatedArtworks = generatedArtworks.filter(art => art.id !== id);
  return generatedArtworks.length < initialLength;
};

/**
 * Generate art title based on parameters
 */
function generateArtTitle(params: ArtGenerationParams): string {
  const adjectives: Record<string, string[]> = {
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

  const themeWords: Record<string, string[]> = {
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

  const styleAdj = adjectives[params.style] || adjectives.Abstract;
  const themeWord = themeWords[params.theme] || themeWords.Nature;

  const adj = styleAdj[Math.floor(Math.random() * styleAdj.length)];
  const noun = themeWord[Math.floor(Math.random() * themeWord.length)];

  return `${adj} ${noun} #${Math.floor(Math.random() * 1000)}`;
}
