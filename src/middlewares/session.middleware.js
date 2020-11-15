const session = require('telegraf/session')

module.exports = session({
  /** @param {import('telegraf/typings/context').TelegrafContext} ctx */
  getSessionKey: (ctx) => {
    return ctx.from && ctx.chat ? `${ctx.from.id}:${ctx.chat.id}` : null
  },
})
