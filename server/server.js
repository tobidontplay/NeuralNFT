const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const blockchain = require('./blockchain/contractInteraction');
const aiService = require('./ai/service');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data storage
const generatedArtworks = [];
const nfts = [];
const nftTransactions = [];

// Get art styles and parameters from AI service
const artStyles = aiService.getAvailableStyles();
const colorSchemes = aiService.getAvailableColorSchemes();
const themes = aiService.getAvailableThemes();

// Helper function to generate art title
function generateArtTitle(params) {
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

  const styleAdj = adjectives[params.style] || adjectives.Abstract;
  const themeWord = themeWords[params.theme] || themeWords.Nature;

  const adj = styleAdj[Math.floor(Math.random() * styleAdj.length)];
  const noun = themeWord[Math.floor(Math.random() * themeWord.length)];

  return `${adj} ${noun} #${Math.floor(Math.random() * 1000)}`;
}

// Mock SVG generation (simplified version)
function generateMockSVG(params) {
  const width = 800;
  const height = 800;
  const numElements = Math.floor(50 + params.complexity * 150);
  const background = params.colorScheme === 'Dark Mode' ? '#1a1a1a' : '#ffffff';
  
  // Generate a simple SVG with random shapes
  let elements = '';
  for (let i = 0; i < numElements; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 100 * params.complexity + 20;
    const opacity = 0.3 + Math.random() * 0.7;
    
    // Random color based on color scheme
    const colors = {
      Vibrant: ['#FF1744', '#D500F9', '#2979FF', '#00E676', '#FFEA00'],
      Pastel: ['#FFB6C1', '#B0E0E6', '#98FB98', '#DDA0DD', '#F0E68C'],
      Monochrome: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
      Neon: ['#FF00FF', '#00FF00', '#00FFFF', '#FF0000', '#FFA500'],
      'Earth Tones': ['#8B4513', '#DAA520', '#556B2F', '#8B0000', '#696969'],
      Synthwave: ['#FF00FF', '#00FFFF', '#FF0066', '#9933FF', '#FF3366'],
      'Dark Mode': ['#1A1A1A', '#333333', '#4D4D4D', '#666666', '#808080'],
      Retro: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    };
    
    const colorArray = colors[params.colorScheme] || colors.Vibrant;
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    // Random shape based on style
    const shapes = {
      Abstract: ['circle', 'rect', 'path'],
      Cubism: ['rect', 'polygon'],
      Minimalism: ['circle', 'rect'],
      'Pixel Art': ['rect'],
      Surrealism: ['path', 'circle', 'ellipse'],
      Impressionism: ['circle', 'ellipse'],
      Vaporwave: ['rect', 'polygon', 'circle'],
      Cyberpunk: ['rect', 'line', 'polygon'],
      'Pop Art': ['circle', 'rect'],
      Watercolor: ['circle', 'ellipse', 'path'],
    };
    
    const shapeArray = shapes[params.style] || shapes.Abstract;
    const shape = shapeArray[Math.floor(Math.random() * shapeArray.length)];
    
    // Generate SVG element based on shape
    if (shape === 'circle') {
      elements += `<circle cx="${x}" cy="${y}" r="${size/2}" fill="${color}" opacity="${opacity}" />`;
    } else if (shape === 'rect') {
      elements += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" opacity="${opacity}" />`;
    } else if (shape === 'ellipse') {
      elements += `<ellipse cx="${x}" cy="${y}" rx="${size}" ry="${size/2}" fill="${color}" opacity="${opacity}" />`;
    }
  }
  
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${background}" />
    ${elements}
  </svg>`;
  
  return svg;
}

function svgToDataURL(svg) {
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// API Routes
// Art API
app.post('/api/art/generate', async (req, res) => {
  try {
    const params = req.body;
    
    if (!params.style || !params.colorScheme || params.complexity === undefined || !params.theme) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required parameters' 
      });
    }
    
    // Generate art using AI service
    const result = await aiService.generateArt(params);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error || 'Error generating artwork'
      });
    }
    
    // Create generated art object
    const generatedArt = {
      id: uuidv4(),
      imageUrl: result.imageUrl,
      title: generateArtTitle(params),
      params,
      created: new Date(),
      minted: false
    };
    
    // Save to storage
    generatedArtworks.push(generatedArt);
    
    return res.status(200).json({
      success: true,
      data: generatedArt
    });
  } catch (error) {
    console.error('Error generating art:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error generating artwork'
    });
  }
});

app.get('/api/art', (req, res) => {
  return res.status(200).json({
    success: true,
    data: generatedArtworks
  });
});

app.get('/api/art/parameters', (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      styles: artStyles,
      colorSchemes: colorSchemes,
      themes: themes,
      complexityRange: {
        min: 0,
        max: 1,
        default: 0.5
      }
    }
  });
});

app.get('/api/art/:id', (req, res) => {
  const { id } = req.params;
  const artwork = generatedArtworks.find(art => art.id === id);
  
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
});

// NFT API
app.post('/api/nft/mint', async (req, res) => {
  try {
    const { artId, walletAddress } = req.body;
    
    if (!artId || !walletAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    // Get the artwork to mint
    const artwork = generatedArtworks.find(art => art.id === artId);
    
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }
    
    if (artwork.minted) {
      return res.status(400).json({
        success: false,
        message: 'Artwork has already been minted'
      });
    }
    
    // Create metadata for the NFT
    const metadata = {
      name: artwork.title,
      description: `AI-generated artwork created with ArtifyNFT`,
      image: artwork.imageUrl,
      attributes: [
        {
          trait_type: 'Style',
          value: artwork.params.style
        },
        {
          trait_type: 'Color Scheme',
          value: artwork.params.colorScheme
        },
        {
          trait_type: 'Complexity',
          value: artwork.params.complexity.toString()
        },
        {
          trait_type: 'Theme',
          value: artwork.params.theme
        }
      ]
    };
    
    // In a production environment, we would store this metadata on IPFS
    // For local development, we'll store it in a local file
    const metadataId = uuidv4();
    const metadataPath = path.join(__dirname, 'uploads', `metadata-${metadataId}.json`);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    // Create a tokenURI that points to the metadata
    // In production, this would be an IPFS URI
    const tokenURI = `/uploads/metadata-${metadataId}.json`;
    
    // Mint the NFT on the blockchain
    const result = await blockchain.mintNFT(walletAddress, tokenURI);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error || 'Error minting NFT on blockchain'
      });
    }
    
    const nft = {
      id: uuidv4(),
      tokenId: result.tokenId,
      artId,
      owner: walletAddress,
      price: 0,
      forSale: false,
      created: new Date(),
      transactionHash: result.transactionHash
    };
    
    // Save NFT
    nfts.push(nft);
    
    // Record transaction
    const transaction = {
      id: uuidv4(),
      tokenId: result.tokenId,
      from: '0x0000000000000000000000000000000000000000', // Zero address for minting
      to: walletAddress,
      price: 0,
      timestamp: new Date(),
      transactionHash: result.transactionHash,
      type: 'mint'
    };
    
    nftTransactions.push(transaction);
    
    // Update artwork to mark as minted
    const artworkIndex = generatedArtworks.findIndex(art => art.id === artId);
    generatedArtworks[artworkIndex].minted = true;
    
    return res.status(201).json({
      success: true,
      data: nft
    });
  } catch (error) {
    console.error('Error minting NFT:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error minting NFT'
    });
  }
});

app.get('/api/nft', (req, res) => {
  return res.status(200).json({
    success: true,
    data: nfts
  });
});

app.get('/api/nft/owner/:address', (req, res) => {
  const { address } = req.params;
  const ownerNFTs = nfts.filter(nft => nft.owner.toLowerCase() === address.toLowerCase());
  
  return res.status(200).json({
    success: true,
    data: ownerNFTs
  });
});

// Wallet API
app.get('/api/wallet/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    // Get real balance from the blockchain
    const result = await blockchain.getWalletBalance(address);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error || 'Error getting wallet balance'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        address,
        balance: result.balance
      }
    });
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error getting wallet balance'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize services and start server
async function startServer() {
  try {
    // Initialize blockchain connection
    console.log('Initializing blockchain connection...');
    const blockchainInitialized = await blockchain.initBlockchain();
    
    if (!blockchainInitialized) {
      console.error('Failed to initialize blockchain connection. Make sure the local Hardhat network is running.');
      process.exit(1);
    }
    
    // Initialize AI service
    console.log('Initializing AI service...');
    const aiInitialized = await aiService.initializeAIService();
    
    if (!aiInitialized) {
      console.error('Failed to initialize AI service.');
      process.exit(1);
    }
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Smart contract deployed at: ${blockchain.contractAddress}`);
      console.log('AI service initialized and ready for art generation');
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
