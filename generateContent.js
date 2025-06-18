const ai = require("./model.js");

const generateContentText = async (question) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: question,
  });
  
  return response.text;
}

const generateContentTextWithImage = async (question, image) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: question,
    image: image,
  });

  return response.text;
};

module.exports = {
  generateContentText, generateContentTextWithImage
};
