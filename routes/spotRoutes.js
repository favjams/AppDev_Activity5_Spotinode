const express = require('express');
const router = express.Router();
const musicController = require('../controller/musicController');
const multer = require('multer');
const path = require('path');

// Multer storage setup for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Create unique filenames
    },
});

const upload = multer({ storage });

// Routes
router.get('/', musicController.getMusic);  // Get all songs
router.get('/upload', musicController.showUploadForm);  // Show upload form

// Update route to handle both the image and song file uploads
router.post('/upload', upload.fields([{ name: 'image_cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), musicController.addMusic);

router.get('/edit/:id', musicController.getMusicById);  // Get song by ID for editing
router.post('/edit/:id', upload.single('songFile'), musicController.updateMusic);  // Update song
router.post('/delete/:id', musicController.deleteMusic);  // Delete song

module.exports = router;
