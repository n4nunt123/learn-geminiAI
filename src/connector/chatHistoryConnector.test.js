const chatHistoryConnector = require('./ChatHistoryConnector');

describe('#chatHistoryConnector', () => {
  const db = {
    find: jest.fn()
  };
  const options = { db };
  let connector;
  const id = '0000000';

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

  it('should called db.find with query when getById is invoked', async () => {
    const query = { id };
    const histoies = [{ id, content: 'Test history' }];
    db.find.mockResolvedValue(histoies);

    const result = await connector.getById(id);

    expect(db.find).toHaveBeenCalledWith(query);
    expect(result).toEqual(histoies);
  });

  it('should thow error when getById is invoked and error', async () => {
    db.find.mockRejectedValue(new Error('Database error'));

    await expect(connector.getById(id)).rejects.toThrow('Database error');
  });
});