const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({

  originalText: {
    type: String,
    required: true,
  },
  summarizedText: {
    type: String,
    required: true,
  },
  insights: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UploadModel= mongoose.model('Upload', uploadSchema);

module.exports = { UploadModel }