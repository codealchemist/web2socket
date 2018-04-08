function log (prefix) {
  return function () {
    const ts = (new Date()).toISOString()
    console.log(`${ts} ${prefix}:`, ...arguments)
  }
}

module.exports = log
