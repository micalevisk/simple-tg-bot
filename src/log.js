const log = require('debug')('simple-tg-bot')

module.exports.debug = log.extend('debug')
module.exports.info = log.extend('info')
module.exports.error = log.extend('error')
