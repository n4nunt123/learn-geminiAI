const { createUserContent, Modality } = require('@google/genai');
const fs = require('fs');

const ai = require('./model.js');

const generateContentText = async (question) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: question,
  });
  
  return response.text;
}

const generateContentTextWithFile = async (prompt, file) => {
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

const generateContentImage = async (prompt) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-preview-image-generation',
    contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE]
    }
  });

  console.log(response)
}

(async () => await generateContentImage('A knight with his great sword, standing grieving over his fallen comrades in the battlefield'))();

module.exports = {
  generateContentText, generateContentTextWithFile
};
