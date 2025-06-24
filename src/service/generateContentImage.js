const { Modality } = require('@google/genai');
const fs = require('fs');

const generateContentImage = async (payload) => {
  const { prompt, ai } = payload;

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
      const filePath = `../output/images/output-generated-genAI-${Date.now()}.png`;

      console.log(`Saving image to ${filePath}`);
      fs.writeFileSync(filePath, buffer);
      return `Image saved to ${filePath}`;
    }
  }
}

module.exports = generateContentImage;
