const {
  checkIsGroup,
  checkHasReply,
  checkIsAdminMessage,
  replyRepliedMessageWith,
  deleteRepliedMessage,
  deleteMessage,
} = require('../middlewares')

/**
 * @typedef {import('telegraf/typings/telegraf').Telegraf} Bot
 *
 * @param {Bot} bot
 * @param {import('./types').JavaOpts} opts
 */
const makeMiddlewareChain = (bot, opts) => [
  checkIsGroup,

  checkHasReply,

  checkIsAdminMessage,

  replyRepliedMessageWith(bot)(opts.replyMsg),

  deleteRepliedMessage,

  deleteMessage,
]

/** @type {import('./types').CommandDefinition} */
module.exports = {
  command: 'java',
  description: '"java is not javascript" alert',
  optsId: 'javaOpts',
  makeMiddlewareChain,
}
