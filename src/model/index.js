const { GoogleGenAI } = require('@google/genai');

const { key: { GOOGLE_GENAI_API_KEY } } = require('../../config');

const ai = new GoogleGenAI({ apiKey: GOOGLE_GENAI_API_KEY });

module.exports = ai;
