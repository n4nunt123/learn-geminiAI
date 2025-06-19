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
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE]
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.text) console.log(`reponse text: ${part.text}`);

      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        const filePath = `./images/output-generated-genAI-${Date.now()}.png`;
  
        console.log(`Saving image to ${filePath}`);
        fs.writeFileSync(filePath, buffer);
        return `Image saved to ${filePath}`;
      }
    }
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}

(async () => await generateContentImage('A knight with his great sword, standing grieving over his fallen comrades in the battlefield'))();

module.exports = {
  generateContentText, generateContentTextWithFile
};
