const log = (message, additionalData, level = 'info') => {
  const levels = {
    info: console.log,
    warn: console.warn,
    error: console.error
  };

  if (additionalData) {
    return levels[level](`[${message}]`, additionalData);
  }

  return levels[level](`[${message}]`);
};

module.exports = log;