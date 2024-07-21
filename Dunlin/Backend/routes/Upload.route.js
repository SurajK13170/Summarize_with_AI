const express = require("express");
const multer = require("multer")
const fs = require("fs")
const path = require('path');
const {auth} = require("../middlewares/auth")
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const { UploadModel } = require("../models/Upload.model");

const genAI = new GoogleGenerativeAI(process.env.apiKey);
const uploadRoute = express.Router();

const upload = multer({ dest: 'uploads/' })


const readFileContent = (filePath, mimeType) => {
  if (mimeType === 'text/plain') {
    return fs.readFileSync(filePath, 'utf-8');
  } else if (mimeType === 'text/html') {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    return htmlToText(htmlContent);
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const docxBuffer = fs.readFileSync(filePath);
    return mammoth.extractRawText({ buffer: docxBuffer })
      .then(result => result.value);
  } else {
    throw new Error('Unsupported file format');
  }
};



uploadRoute.post('/', upload.single('file'),auth, async (req, res) => {
  try {
    let fileContent = ""
    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
      const mimeType = req.file.mimetype;
      fileContent = await readFileContent(filePath, mimeType);
      fs.unlinkSync(filePath);
    } else if (req.body.text) {
      fileContent = req.body.text;
    } else {
      return res.status(400).json({ error: 'No file uploaded and no text provided' });
    }


    // Send the file content to the AI service
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(`you have to do text summarization and analysis
    on the text that I have provided. The text is as follows: ${fileContent}`);
    const post = result.response.text();

    const newUpload = new UploadModel({
      // user: req.body.userID,
      originalText: fileContent,
      summarizedText: post,
      insights: {},
    });

    await newUpload.save();

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


uploadRoute.get("/history", auth,async (req, res) => {
  try {
    const uploads = await UploadModel.find();
    if(!uploads){
      return res.status(404).json({ error: 'No uploads found' });
    }
    res.status(200).json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


uploadRoute.get('/history/:id',auth, async (req, res) => {
  const {id} = req.params
  try {
    const summary = await UploadModel.findById({_id:id});
    if (!summary) {
      return res.status(404).json({ error: 'Summary not found.' });
    }
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching summary.' });
  }
});

module.exports = { uploadRoute };
