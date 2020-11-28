const { debug } = require('../log')
const { isPrivateChat: isPrivate } = require('./helpers')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 * @param {() => Promise<void>} next
 */
module.exports = async (ctx, next) => {
  ctx.state.ok = false

  if (isPrivate(ctx)) {
    debug('message is from a (super)group. from_id=%s', ctx.message.from.id)

    ctx.state.ok = true
    next()
  }
}
