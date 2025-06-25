const { isMissingValue, log } = require('../utils');

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

  async getById(id) {
    try {
      const query = { id };
      const users = await this.db.find(query);

      return users;
    } catch (error) {
      log('Error fetching users:', error, 'error');
      throw error;
    }
  }
}

module.exports = ChatHistoryConnector;
