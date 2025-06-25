const MongoModels = require('mongo-models');

const { ChatHistory } = require('./modelFactories');
const { ChatHistoryConnector }  = require('../connector');
const { log } = require('../utils')

const createConnectionDb = async (config) => {
  const {
    username, password, instance, name: databaseName
  } = config;
  let uri = `mongodb://${instance}/${databaseName}`;

  if (username && password) {
    uri = `mongodb://${username}:${password}@${instance}/${databaseName}`;
  }

  try {
    log(`Connecting to database ${uri}`);
    await MongoModels.connect({ uri, db: databaseName }, { useUnifiedTopology: true });
    log('Connection to database is success');

    const chatHistoryConnector = new ChatHistoryConnector({ db: ChatHistory });

    return { chatHistoryConnector };
  } catch (error) {
    log('Something when error when creating connection to database', error, 'error');
    throw error;
  }
};

module.exports = createConnectionDb;
