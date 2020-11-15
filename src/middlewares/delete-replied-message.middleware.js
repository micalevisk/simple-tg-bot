const { error, debug } = require('../log')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 * @param {() => Promise<void>} next
 */
module.exports = async (ctx, next) => {
  ctx.state.ok = false

  const repliedMessage = ctx.message.reply_to_message

  try {
    await ctx.deleteMessage(repliedMessage.message_id)
    debug(
      'delete reply message. from_id=%s message_id=%s',
      ctx.message.from.id,
      repliedMessage.message_id,
    )

    ctx.state.ok = true
  } catch (err) {
    // Ignore errors
    error(
      'error while attempted to delete reply message. from_id=%s message_id=%s error="%s"',
      ctx.message.from.id,
      repliedMessage.message_id,
      err.message,
    )
  } finally {
    next()
  }
}
