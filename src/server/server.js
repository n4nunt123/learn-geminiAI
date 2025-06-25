const express = require('express');
const multer = require('multer');
const fs = require('fs');

const {
  generateContentText,
  generateContentTextWithFile,
  generateContentImage
} = require('../service');
const { isMissingValue, log } = require('../utils');
const ai = require('../model');
const config = require('../../config');
const createConnectionDb = require('../factories/databaseFactories');

const app = express();
const port = 3000;
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

const { chatHistoryConnector } = createConnectionDb(config.database);

app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});

app.post('/generate-content-text', async (req, res) => {
  const { prompt } = req.body;
  isMissingValue(prompt, 'prompt');

  try {
    log('generating content');
    const content = await generateContentText({ prompt, ai});

    res.json({ output: content });
  } catch (error) {
    log('Error generating content:', error, 'error');

    if (error.code === 'MISSING_VALUE') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.post('/generate-content-from-image', upload.single('image'), async (req, res) => {
  const {
    body: { prompt }, file
  } = req;
  isMissingValue(prompt, 'prompt');
  isMissingValue(file, 'file');
  
  try {
    log('generating content');
    const content = await generateContentTextWithFile({
      prompt, file, ai
    });

    res.json({ output: content });
  } catch (error) {
    log('Error generating content:', error, 'error');

    if (error.code === 'MISSING_VALUE') {
      return res.status(400).json({ error: error.message });
    }
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
  
  try {
    log('generating content');
    const content = await generateContentTextWithFile({
      prompt, file, ai
    });

    res.json({ output: content });
  } catch (error) {
    log('Error generating content:', error, 'error');

    if (error.code === 'MISSING_VALUE') {
      return res.status(400).json({ error: error.message });
    }
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
  
  try {
    log('generating content');
    const content = await generateContentTextWithFile({
      prompt, file, ai
    });

    res.json({ output: content });
  } catch (error) {
    log('Error generating content:', error, 'error');

    if (error.code === 'MISSING_VALUE') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to generate content' });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.post('/generate-content-image', async (req, res) => {
  const { prompt } = req.body;
  isMissingValue(prompt, 'prompt');

  try {
    log('generating image content');
    const content = await generateContentImage({
      prompt, ai
    });

    res.json({ output: content });
  } catch (error) {
    log('Error generating content:', error, 'error');

    if (error.code === 'MISSING_VALUE') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = app;
