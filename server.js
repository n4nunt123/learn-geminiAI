const express = require('express');
const multer = require('multer');
const fs = require('fs');

const {
  generateContentText,
  generateContentTextWithFile,
  generateContentImage
} = require('./generateContent');
const { isMissingValue } = require('./utils')

const app = express();
const port = 3000;
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/generate-content-text', async (req, res) => {
  const { prompt } = req.body;
  isMissingValue(prompt, 'prompt');

  // if (!prompt) {
  //   console.log('prompt is required');
  //   return res.status(400).json({ error: 'prompt is required' });
  // }

  try {
    console.log('generating content');
    const content = await generateContentText(prompt);
    res.json({ output: content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.post('/generate-content-from-image', upload.single('image'), async (req, res) => {
  const {
    body: { prompt }, file
  } = req;
  isMissingValue(prompt, 'prompt');
  isMissingValue(file, 'file');

  // if (!prompt || !file) {
  //   console.log('prompt is required and file must be uploaded');
  //   return res.status(400).json({ error: 'prompt is required' });
  // }
  
  try {
    console.log('generating content');
    const content = await generateContentTextWithFile(prompt, file);
    res.json({ output: content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.post('/generate-content-from-document', upload.single('document'), async (req, res) => {
  const {
    body: { prompt }, file
  } = req;
  isMissingValue(prompt, 'prompt');
  isMissingValue(prompt, 'file');
  
  // if (!prompt || !file) {
  //   console.log('prompt is required and file must be uploaded');
  //   return res.status(400).json({ error: 'prompt is required' });
  // }
  
  try {
    console.log('generating content');
    const content = await generateContentTextWithFile(prompt, file);
    res.json({ output: content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.post('/generate-content-from-audio', upload.single('audio'), async (req, res) => {
  const {
    body: { prompt }, file
  } = req;
  isMissingValue(prompt, 'prompt');
  isMissingValue(prompt, 'file');
  
  // if (!prompt || !file) {
  //   console.log('prompt is required and file must be uploaded');
  //   return res.status(400).json({ error: 'prompt is required' });
  // }
  
  try {
    console.log('generating content');
    const content = await generateContentTextWithFile(prompt, file);
    res.json({ output: content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.post('/generate-content-image', async (req, res) => {
  const { prompt } = req.body;
  isMissingValue(prompt, 'prompt');

  // if (!prompt) {
  //   console.log('prompt is required');
  //   return res.status(400).json({ error: 'prompt is required' });
  // }

  try {
    console.log('generating image content');
    const content = await generateContentImage(prompt);
    res.json({ output: content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = app;
