const { debug } = require('../log')
const { isGroupChat } = require('./helpers')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 * @param {() => Promise<void>} next
 */
module.exports = async (ctx, next) => {
  ctx.state.ok = false

  if (isGroupChat(ctx)) {
    debug('message is from a (super)group. from_id=%s', ctx.message.from.id)

    ctx.state.ok = true
    next()
  }
}
