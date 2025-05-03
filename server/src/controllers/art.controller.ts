import { Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ArtGenerationParams, GeneratedArt } from '../models/art.model';
import * as ArtService from '../services/art.service';

// In-memory storage for generated art (replace with database in production)
let generatedArtworks: GeneratedArt[] = [];

/**
 * Generate art using AI model
 */
export const generateArt = async (req: Request, res: Response) => {
  try {
    const params: ArtGenerationParams = req.body;
    
    // Validate input parameters
    if (!params.style || !params.colorScheme || params.complexity === undefined || !params.theme) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required parameters' 
      });
    }
    
    // Call AI service to generate art
    const generatedArt = await ArtService.generateArtWithAI(params);
    
    return res.status(200).json({
      success: true,
      data: generatedArt
    });
  } catch (error: any) {
    console.error('Error generating art:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error generating artwork'
    });
  }
};

/**
 * Get all generated art pieces
 */
export const getAllArt = async (req: Request, res: Response) => {
  try {
    const artworks = await ArtService.getAllArtworks();
    
    return res.status(200).json({
      success: true,
      data: artworks
    });
  } catch (error: any) {
    console.error('Error fetching artworks:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching artworks'
    });
  }
};

/**
 * Get a specific art piece by ID
 */
export const getArtById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artwork = await ArtService.getArtworkById(id);
    
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: artwork
    });
  } catch (error: any) {
    console.error('Error fetching artwork:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching artwork'
    });
  }
};

/**
 * Upload custom art
 */
export const uploadArt = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    const { title, style, colorScheme, theme } = req.body;
    const complexity = parseFloat(req.body.complexity || '0.5');
    
    // Create artwork entry
    const artwork: GeneratedArt = {
      id: uuidv4(),
      imageUrl: `/uploads/${req.file.filename}`,
      title: title || 'Untitled Artwork',
      params: {
        style: style || 'Custom',
        colorScheme: colorScheme || 'Custom',
        complexity: complexity,
        theme: theme || 'Custom'
      },
      created: new Date(),
      minted: false
    };
    
    // Save artwork
    await ArtService.saveArtwork(artwork);
    
    return res.status(201).json({
      success: true,
      data: artwork
    });
  } catch (error: any) {
    console.error('Error uploading artwork:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error uploading artwork'
    });
  }
};

/**
 * Save generated art
 */
export const saveArt = async (req: Request, res: Response) => {
  try {
    const artData: GeneratedArt = req.body;
    
    if (!artData.imageUrl || !artData.title || !artData.params) {
      return res.status(400).json({
        success: false,
        message: 'Missing required artwork data'
      });
    }
    
    // For base64 image data
    if (artData.imageUrl.startsWith('data:image')) {
      // Convert base64 to file and save
      const base64Data = artData.imageUrl.split(',')[1];
      const fileName = `${Date.now()}-${uuidv4()}.png`;
      const filePath = path.join(__dirname, '../../uploads/', fileName);
      
      // Ensure uploads directory exists
      if (!fs.existsSync(path.join(__dirname, '../../uploads/'))) {
        fs.mkdirSync(path.join(__dirname, '../../uploads/'), { recursive: true });
      }
      
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
      
      // Update image URL to file path
      artData.imageUrl = `/uploads/${fileName}`;
    }
    
    // Save artwork
    const savedArt = await ArtService.saveArtwork({
      ...artData,
      id: uuidv4(),
      created: new Date(),
      minted: false
    });
    
    return res.status(201).json({
      success: true,
      data: savedArt
    });
  } catch (error: any) {
    console.error('Error saving artwork:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error saving artwork'
    });
  }
};
