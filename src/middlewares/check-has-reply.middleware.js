const { debug } = require('../log')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 * @param {() => Promise<void>} next
 */
module.exports = (ctx, next) => {
  ctx.state.ok = false

  if (ctx.message && !!ctx.message.reply_to_message) {
    debug(
      'message has reply to. from_id=%s message_id=%s',
      ctx.message.from.id,
      ctx.message.reply_to_message.message_id,
    )

    ctx.state.ok = true
    next()
  }
}
