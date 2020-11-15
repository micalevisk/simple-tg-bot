const { error } = require('../log')
const { getChatAdmins } = require('./helpers')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 * @param {() => Promise<void>} next
 */
module.exports = async (ctx, next) => {
  ctx.state.ok = false

  try {
    await getChatAdmins(ctx)

    ctx.state.ok = true
  } catch (err) {
    error(
      'error while attempted to refresh admins list. from_id=%s error="%s"',
      ctx.message.from.id,
      err.message,
    )
  } finally {
    next()
  }
}
