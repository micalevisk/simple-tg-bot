const { debug, error } = require('../log')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 */
module.exports = async (ctx) => {
  const messageId = ctx.message.message_id

  try {
    await ctx.deleteMessage(messageId)
    debug(
      'delete user message. from_id=%s message_id=%s',
      ctx.message.from.id,
      messageId,
    )
  } catch (err) {
    error(
      'error while attempted to delete user\'s message. from_id=%s message_id=%s to_chat_id=%s error="%s"',
      ctx.message.from.id,
      messageId,
      err.message,
    )
  }
}
