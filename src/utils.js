const fs = require('fs')

/**
 * @param {string} filename
 * @returns {object}
 */
module.exports.readJson = (filename) => {
  const rawData = fs.readFileSync(filename, { encoding: 'utf8' })
  return JSON.parse(rawData)
}
