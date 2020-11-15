const { debug } = require('../log')
const { isGroupChat, getChatAdmins } = require('./helpers')

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

  const chatMembers = await getChatAdmins(ctx)
  if (chatMembers && chatMembers.length) {
    const adminFound = chatMembers.find(({ user }) => user.id === ctx.from.id)
    if (adminFound) {
      debug('is message from a chat admin. from_id=%s', ctx.message.from.id)

      ctx.state.ok = true
      next()
    }
  }
}
