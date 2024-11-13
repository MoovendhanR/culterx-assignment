// backend/models/Media.js
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  path: { type: String, required: true },
  filename: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', mediaSchema);
