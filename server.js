const express = require('express');
const multer = require('multer');

const {
  generateContentText
} = require('./generateContent');

const app = express();
const port = 3000;
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/content-text', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    const content = await generateContentText(prompt);
    res.json({ output: content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.post('/content-text-image', upload.single('image'), async (req, res) => {
  const { prompt } = req.body;
  const image = req.file;
});

module.exports = app;

