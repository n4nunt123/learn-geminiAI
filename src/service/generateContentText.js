const generateContentText = async (payload) => {
  const { prompt, ai } = payload;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });
  
  return response.text;
}

module.exports = generateContentText;
