const chatHistoryConnector = require('./chatHistoryConnector');

describe('#chatHistoryConnector', () => {
  const db = {
    find: jest.fn()
  };
  const options = { db };
  let connector;

  beforeEach(() => {
    connector = new chatHistoryConnector(options);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error when options.db is missing', () => {
    const error = new Error({
      message: `Variable "db" is missing (null or undefined)`,
      code: 'MISSING_VALUE'
    });

    expect(() => new chatHistoryConnector({})).toThrow(error);
  });
});