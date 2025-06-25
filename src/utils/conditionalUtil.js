const NOP = () => {};

const isMissingValue = (val, valName) => {
  if (val === null || typeof val === 'undefined') {
    throw new Error({
      message: `Variable "${valName}" is missing (null or undefined)`,
      code: 'MISSING_VALUE'
    });
  }
  return NOP();
};

module.exports = { NOP, isMissingValue };
