const { checkIsPrivate, deleteMessage } = require('../middlewares')

/**
 */
const makeMiddlewareChain = () => [checkIsPrivate, deleteMessage]

/** @type {import('./types').CommandDefinition} */
module.exports = {
  command: 'ping',
  description: 'check if the bot is alive',
  makeMiddlewareChain,
}
