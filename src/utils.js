const fs = require('fs')

/**
 * @param {string} filename
 * @returns {object}
 */
module.exports.readJson = (filename) => {
  const rawData = fs.readFileSync(filename, { encoding: 'utf8' })
  return JSON.parse(rawData)
}

/**
 * Get a random item of array `arr`
 * @param {Array<any>} arr
 * @returns {any}
 */
module.exports.pickRandomItem = (arr) => {
  if (!arr.length) {
    throw new Error('Cannot get a random item from an empty array')
  }
  const randomIdx = Math.floor(Math.random() * arr.length)
  return arr[randomIdx]
}
