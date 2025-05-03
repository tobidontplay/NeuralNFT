const path = require('path');
const fs = require('fs');
const styleGANGenerator = require('./model');

// Create models directory if it doesn't exist
const modelsDir = path.join(__dirname, 'models');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Initialize the AI service
async function initializeAIService() {
  try {
    console.log('Initializing AI service...');
    const initialized = await styleGANGenerator.initialize();
    
    if (initialized) {
      console.log('AI service initialized successfully');
      return true;
    } else {
      console.error('Failed to initialize AI service');
      return false;
    }
  } catch (error) {
    console.error('Error initializing AI service:', error);
    return false;
  }
}

// Generate art using the AI model
async function generateArt(params) {
  try {
    // Validate parameters
    if (!params.style || !params.colorScheme || params.complexity === undefined || !params.theme) {
      throw new Error('Missing required parameters');
    }
    
    // Ensure complexity is between 0 and 1
    params.complexity = Math.max(0, Math.min(1, params.complexity));
    
    // Generate image
    const result = await styleGANGenerator.generateImage(params);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to generate image');
    }
    
    return {
      success: true,
      imageUrl: result.imageUrl,
      imageId: result.imageId
    };
  } catch (error) {
    console.error('Error generating art:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Get available styles
function getAvailableStyles() {
  return [
    'Abstract',
    'Cubism',
    'Impressionism',
    'Pixel Art',
    'Surrealism',
    'Minimalism',
    'Vaporwave',
    'Cyberpunk',
    'Pop Art',
    'Watercolor'
  ];
}

// Get available color schemes
function getAvailableColorSchemes() {
  return [
    'Vibrant',
    'Pastel',
    'Monochrome',
    'Neon',
    'Earth Tones',
    'Synthwave',
    'Dark Mode',
    'Retro'
  ];
}

// Get available themes
function getAvailableThemes() {
  return [
    'Nature',
    'Cityscape',
    'Space',
    'Underwater',
    'Abstract Geometry',
    'Futuristic',
    'Fantasy',
    'Vintage',
    'Dreamscape'
  ];
}

module.exports = {
  initializeAIService,
  generateArt,
  getAvailableStyles,
  getAvailableColorSchemes,
  getAvailableThemes
};
