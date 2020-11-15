const {
  checkIsAdminMessage,
  refreshAdminsList,
  deleteMessage,
} = require('../middlewares')

/**
 * @typedef {import('telegraf/typings/telegraf').Telegraf} Bot
 *
 * @param {Bot} bot
 */
const makeMiddlewareChain = (bot) => [
  checkIsAdminMessage,
  refreshAdminsList,
  deleteMessage,
]

/** @type {import('./types').CommandDefinition} */
module.exports = {
  command: 'radmins',
  description: 'refresh chat admins in memory list',
  makeMiddlewareChain,
}
