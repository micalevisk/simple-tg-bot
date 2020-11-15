const debug = require('debug')

module.exports.debug = debug('simple-tg-bot:debug')
module.exports.info = debug('simple-tg-bot:info')
module.exports.error = debug('simple-tg-bot:error')
