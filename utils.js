const NOP = () => {};

const isMissingValue = (val, valName) => {
  if (val === null || typeof val === 'undefined') {
    throw new Error({
      message: `Variable "${valName}" is missing (null or undefined)`
    });
  }
  return NOP;
};

module.exports = { NOP, isMissingValue };
