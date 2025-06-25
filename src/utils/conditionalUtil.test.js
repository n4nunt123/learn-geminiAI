const { NOP, isMissingValue } = require('./conditionalUtil');

describe('#conditionalUtil', () => {
  const resultNOP = undefined;
  const valName = 'command';
  const code = 'MISSING_VALUE';
  const errorMessage = `Variable "${valName}" is missing (null or undefined)`;
  const error = new Error({
    message: errorMessage,
    code: code
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return nothing || undefined when NOP is invoked', async () => {
    const result = NOP();

    expect(result).toEqual(resultNOP);
  });
});