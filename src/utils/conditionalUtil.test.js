const { NOP, isMissingValue } = require('./conditionalUtil');

describe('#conditionalUtil', () => {
  const resultNOP = undefined;
  const val = 'Generate something';
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

  it('should return nothing when isMissingValue is invoked and nothing is missing', () => {
    const result = isMissingValue(val, valName);

    expect(result).toEqual(resultNOP);
  });

  it('should throw error when vav is null and isMissingValue is invoked', () => {
    const valNull = null;

    expect(() => isMissingValue(valNull, valName)).toThrow(error);
  });
});