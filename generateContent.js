const { createUserContent } = require("@google/genai");
const fs = require("fs");

const ai = require("./model.js");

const generateContentText = async (question) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
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
    model: "gemini-2.0-flash",
    contents: [
      createUserContent([
        { inlineData },
        { text: prompt }
      ])
    ]
  });

  return response.text;
};

module.exports = {
  generateContentText, generateContentTextWithFile
};
