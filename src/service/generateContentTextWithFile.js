const { createUserContent } = require('@google/genai');
const fs = require('fs');

const generateContentTextWithFile = async (payload) => {
  const { prompt, file, ai } = payload;

  const inlineData = {
    mimeType: file.mimetype,
    data: fs.readFileSync(file.path).toString('base64')
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      createUserContent([
        { inlineData },
        { text: prompt }
      ])
    ]
  });

  return response.text;
};

module.exports = generateContentTextWithFile;
