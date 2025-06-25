const { isMissingValue, log } = require('../utils');

const generateContentWithChat = async (payload) => {
  const {
    ai, chatId, message, chatHistoryConnector
  } = payload;

  log('Fetch data chat history by chatId', chatId);
  const [{ history }] = await chatHistoryConnector.getById(chatId);
  isMissingValue(history, 'history');

  log('Create chat genAI');
  const chat = ai.chats.create({
    model: 'gemini-2.0-flash',
    history: history || []
  });

  const response = await chat.sendMessage({
    text: message,
    role: 'user'
  });

  return response.text;
};

module.exports = generateContentWithChat;