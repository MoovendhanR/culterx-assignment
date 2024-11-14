// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Media = require('../models/images.model');

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, (__dirname, '../server/uploads'));
    cb(null, (__dirname, '../client/src/images'));

  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + path.extname(file.originalname));
    cb(null, Date.now() + file.originalname);

  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov/;
  const isValidType = allowedTypes.test(file.mimetype);
  if (isValidType) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed.'));
  }
};
const options = {
    storage:storage,
    fileFilter:fileFilter,
    Limits:{
        fileSize:1024 * 1024 * 1024 * 5,
    },
}

const upload = multer(options);


// get
router.get('/', async (req, res) => {
    try {
      const mediaList = await Media.find();
      res.json(mediaList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// POST route for file upload
router.post('/upload', upload.single('media'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  try {
    const media = new Media({
      path: req.file.path,
      filename: req.file.filename,
      type: req.file.mimetype.startsWith('image') ? 'image' : 'video',
    });

    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE route for deleting a media file by ID
router.delete('/:id', async (req, res) => {
    try {
      const media = await Media.findById(req.params.id);
  
      if (!media) {
        return res.status(404).json({ error: 'Media not found' });
      }
      // Delete file from filesystem
      // const filePath = path.join(__dirname, '../', media.path);
      // fs.unlink(filePath, (err) => {
      //   if (err) {
      //     console.error('Error deleting file:', err);
      //     return res.status(500).json({ error: 'Failed to delete file' });
      //   }
      // });
  
      // Delete media document from MongoDB
      await media.deleteOne();
      res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
