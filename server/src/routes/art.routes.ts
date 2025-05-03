import { Router } from 'express';
import * as ArtController from '../controllers/art.controller';
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const router = Router();

// Generate art using AI
router.post('/generate', ArtController.generateArt);

// Get all generated art pieces
router.get('/', ArtController.getAllArt);

// Get a specific art piece by ID
router.get('/:id', ArtController.getArtById);

// Upload custom art (optional feature)
router.post('/upload', upload.single('image'), ArtController.uploadArt);

// Save generated art
router.post('/save', ArtController.saveArt);

export default router;
