const tf = require('@tensorflow/tfjs-node');
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Create models directory if it doesn't exist
const modelsDir = path.join(__dirname, 'models');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Path to save/load the model
const MODEL_PATH = path.join(modelsDir, 'stylegan_model');

// StyleGAN-inspired generator
class StyleGANGenerator {
  constructor() {
    this.model = null;
    this.initialized = false;
  }

  async initialize() {
    try {
      console.log('Initializing StyleGAN generator...');
      
      // Check if model exists locally
      if (fs.existsSync(`${MODEL_PATH}/model.json`)) {
        console.log('Loading model from disk...');
        this.model = await tf.loadLayersModel(`file://${MODEL_PATH}/model.json`);
      } else {
        console.log('Creating and training a new model...');
        // Create a simplified StyleGAN-inspired model
        this.model = this.createModel();
        await this.saveModel();
      }
      
      this.initialized = true;
      console.log('StyleGAN generator initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing StyleGAN generator:', error);
      return false;
    }
  }

  createModel() {
    // Create a simplified StyleGAN-inspired generator model
    // This is a very simplified version for demonstration purposes
    const model = tf.sequential();
    
    // Input layer for latent vector (z)
    model.add(tf.layers.dense({
      units: 256,
      inputShape: [128],
      activation: 'relu'
    }));
    
    // Hidden layers
    model.add(tf.layers.dense({
      units: 512,
      activation: 'relu'
    }));
    
    model.add(tf.layers.dense({
      units: 1024,
      activation: 'relu'
    }));
    
    // Output layer (flattened image representation)
    model.add(tf.layers.dense({
      units: 64 * 64 * 3, // 64x64 RGB image
      activation: 'tanh'
    }));
    
    // Compile the model
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError'
    });
    
    return model;
  }

  async saveModel() {
    if (!this.model) return;
    
    try {
      await this.model.save(`file://${MODEL_PATH}`);
      console.log('Model saved successfully');
    } catch (error) {
      console.error('Error saving model:', error);
    }
  }

  // Generate a random latent vector
  generateLatentVector(seed = null) {
    if (seed) {
      // Use seed for deterministic generation
      tf.setRandom(seed);
    }
    
    // Generate random latent vector
    return tf.randomNormal([1, 128]);
  }

  // Apply style parameters to the latent vector
  applyStyleParameters(latentVector, params) {
    // Extract parameters
    const { style, colorScheme, complexity, theme } = params;
    
    // Convert style to a numeric value (simplified approach)
    const styleValues = {
      'Abstract': 0.1,
      'Cubism': 0.2,
      'Impressionism': 0.3,
      'Pixel Art': 0.4,
      'Surrealism': 0.5,
      'Minimalism': 0.6,
      'Vaporwave': 0.7,
      'Cyberpunk': 0.8,
      'Pop Art': 0.9,
      'Watercolor': 1.0
    };
    
    // Convert color scheme to a numeric value
    const colorValues = {
      'Vibrant': 0.1,
      'Pastel': 0.2,
      'Monochrome': 0.3,
      'Neon': 0.4,
      'Earth Tones': 0.5,
      'Synthwave': 0.6,
      'Dark Mode': 0.7,
      'Retro': 0.8
    };
    
    // Convert theme to a numeric value
    const themeValues = {
      'Nature': 0.1,
      'Cityscape': 0.2,
      'Space': 0.3,
      'Underwater': 0.4,
      'Abstract Geometry': 0.5,
      'Futuristic': 0.6,
      'Fantasy': 0.7,
      'Vintage': 0.8,
      'Dreamscape': 0.9
    };
    
    // Get numeric values or defaults
    const styleValue = styleValues[style] || 0.1;
    const colorValue = colorValues[colorScheme] || 0.1;
    const themeValue = themeValues[theme] || 0.1;
    
    // Modify the latent vector based on parameters (simplified approach)
    const latentData = latentVector.dataSync();
    const modifiedLatent = [];
    
    for (let i = 0; i < latentData.length; i++) {
      if (i % 4 === 0) {
        // Style influence
        modifiedLatent.push(latentData[i] * (1 + styleValue));
      } else if (i % 4 === 1) {
        // Color influence
        modifiedLatent.push(latentData[i] * (1 + colorValue));
      } else if (i % 4 === 2) {
        // Theme influence
        modifiedLatent.push(latentData[i] * (1 + themeValue));
      } else {
        // Complexity influence
        modifiedLatent.push(latentData[i] * (1 + complexity));
      }
    }
    
    return tf.tensor(modifiedLatent, latentVector.shape);
  }

  // Generate an image using the model
  async generateImage(params) {
    if (!this.initialized || !this.model) {
      throw new Error('Model not initialized');
    }
    
    try {
      // Generate latent vector
      const latentVector = this.generateLatentVector();
      
      // Apply style parameters
      const styledLatentVector = this.applyStyleParameters(latentVector, params);
      
      // Generate image using the model
      const prediction = this.model.predict(styledLatentVector);
      
      // Reshape to image dimensions
      const reshapedPrediction = prediction.reshape([64, 64, 3]);
      
      // Convert to pixel values (0-255)
      const normalizedPrediction = reshapedPrediction.add(1).mul(127.5);
      
      // Convert to canvas
      const canvas = createCanvas(64, 64);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(64, 64);
      
      // Get pixel data
      const pixelData = normalizedPrediction.dataSync();
      
      // Set pixel data
      for (let i = 0; i < pixelData.length; i += 3) {
        const offset = (i / 3) * 4;
        imageData.data[offset] = pixelData[i]; // R
        imageData.data[offset + 1] = pixelData[i + 1]; // G
        imageData.data[offset + 2] = pixelData[i + 2]; // B
        imageData.data[offset + 3] = 255; // A (fully opaque)
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Create a larger canvas for the final image
      const finalCanvas = createCanvas(512, 512);
      const finalCtx = finalCanvas.getContext('2d');
      
      // Apply style-specific post-processing
      this.applyStylePostProcessing(finalCtx, canvas, params);
      
      // Save the image
      const imageId = uuidv4();
      const imagePath = path.join(__dirname, '..', 'uploads', `${imageId}.png`);
      
      // Create a buffer from the canvas
      const buffer = finalCanvas.toBuffer('image/png');
      fs.writeFileSync(imagePath, buffer);
      
      // Return the image path
      return {
        success: true,
        imageUrl: `/uploads/${imageId}.png`,
        imageId
      };
    } catch (error) {
      console.error('Error generating image:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Apply style-specific post-processing to the image
  applyStylePostProcessing(finalCtx, sourceCanvas, params) {
    const { style, colorScheme } = params;
    
    // Clear the canvas
    finalCtx.clearRect(0, 0, 512, 512);
    
    // Apply style-specific effects
    switch (style) {
      case 'Abstract':
        // Draw multiple overlapping copies with different blending modes
        finalCtx.globalAlpha = 0.7;
        finalCtx.drawImage(sourceCanvas, 0, 0, 512, 512);
        finalCtx.globalCompositeOperation = 'screen';
        finalCtx.drawImage(sourceCanvas, 50, 50, 412, 412);
        finalCtx.globalCompositeOperation = 'multiply';
        finalCtx.drawImage(sourceCanvas, -50, -50, 612, 612);
        finalCtx.globalCompositeOperation = 'source-over';
        finalCtx.globalAlpha = 1.0;
        break;
        
      case 'Cubism':
        // Create a cubist effect with geometric shapes
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            const sx = Math.floor(Math.random() * 64);
            const sy = Math.floor(Math.random() * 64);
            const sw = Math.floor(Math.random() * 32) + 16;
            const sh = Math.floor(Math.random() * 32) + 16;
            const dx = x * 64;
            const dy = y * 64;
            finalCtx.drawImage(sourceCanvas, sx, sy, sw, sh, dx, dy, 64, 64);
          }
        }
        break;
        
      case 'Pixel Art':
        // Create a pixelated effect
        const pixelSize = 16;
        for (let x = 0; x < 64; x += pixelSize) {
          for (let y = 0; y < 64; y += pixelSize) {
            const dx = x * (512 / 64);
            const dy = y * (512 / 64);
            finalCtx.drawImage(
              sourceCanvas,
              x, y, pixelSize, pixelSize,
              dx, dy, 512 / (64 / pixelSize), 512 / (64 / pixelSize)
            );
          }
        }
        break;
        
      case 'Vaporwave':
        // Create a vaporwave aesthetic
        finalCtx.drawImage(sourceCanvas, 0, 0, 512, 512);
        finalCtx.fillStyle = 'rgba(255, 0, 255, 0.2)';
        finalCtx.fillRect(0, 0, 512, 512);
        finalCtx.fillStyle = 'rgba(0, 255, 255, 0.2)';
        finalCtx.fillRect(0, 0, 512, 512);
        break;
        
      default:
        // Default scaling
        finalCtx.drawImage(sourceCanvas, 0, 0, 512, 512);
        break;
    }
    
    // Apply color scheme effects
    if (colorScheme === 'Monochrome') {
      // Convert to grayscale
      const imageData = finalCtx.getImageData(0, 0, 512, 512);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
      }
      
      finalCtx.putImageData(imageData, 0, 0);
    } else if (colorScheme === 'Neon') {
      // Enhance saturation for neon effect
      const imageData = finalCtx.getImageData(0, 0, 512, 512);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Convert RGB to HSL
        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const l = (max + min) / 2;
        
        // Increase saturation
        data[i] = Math.min(255, r * 1.5);     // R
        data[i + 1] = Math.min(255, g * 1.5); // G
        data[i + 2] = Math.min(255, b * 1.5); // B
      }
      
      finalCtx.putImageData(imageData, 0, 0);
    }
  }
}

// Create and export the generator instance
const generator = new StyleGANGenerator();

module.exports = generator;
