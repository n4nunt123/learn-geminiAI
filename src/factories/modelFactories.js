const MongoModels = require('mongo-models');

class ChatHistory extends MongoModels { }
ChatHistory.collectionName = 'chatHistories';

module.exports = { ChatHistory };
