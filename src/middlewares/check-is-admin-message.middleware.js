const { debug } = require('../log')
const { isGroupChat, getChatAdmins } = require('./helpers')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 */
const resolveUserId = (ctx) => {
  if (ctx.from) {
    // Most common
    return ctx.from.id
  }

  if (ctx.update.callback_query) {
    return ctx.update.callback_query.from.id
  }

  throw new Error(`not implemented path for user id resolution path`)
}

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 * @param {() => Promise<void>} next
 */
module.exports = async (ctx, next) => {
  ctx.state.ok = false

  if (!isGroupChat(ctx)) {
    ctx.state.ok = true
    next()
    return
  }

  const fromUserId = resolveUserId(ctx)

  const chatAdmins = await getChatAdmins(ctx)
  if (chatAdmins && chatAdmins.length) {
    const adminFound = chatAdmins.find(({ user }) => user.id === fromUserId)
    if (adminFound) {
      debug('is message from a chat admin.')

      ctx.state.ok = true
      next()
    } else {
      await ctx.answerCbQuery('Apenas admins podem fazer isso!', true)
    }
  }
}
