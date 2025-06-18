const ai = require("./model.js");

const generateContentText = async (question) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: question,
  });
  
  return response.text;
}

module.exports = generateContentText;
