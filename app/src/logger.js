function log(level, message, extra = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...extra
  };

  console.log(JSON.stringify(entry));
}

module.exports = { log };