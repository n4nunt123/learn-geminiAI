const { isMissingValue } = require('../utils')

/**
 * Chat History Connector
 * options: {
 *   db: Database instance for chat history operations
 * }
 */
class ChatHistoryConnector {
  constructor(options) {
    isMissingValue(options.db);

    Object.assign(this, options);
  }
}

module.exports = ChatHistoryConnector;
