const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const {
  checkIsGroup,
  deleteMessage,
  checkIsAdminMessage,
} = require('../middlewares')
const { getUserMention, getChatAdmins } = require('../middlewares/helpers')
const { createUniqueTriggerId } = require('./helpers')

/**
 * @typedef {import('telegraf/typings/telegraf').Telegraf} Bot
 *
 * @param {Bot} bot
 */
const makeMiddlewareChain = (bot) => {
  const confirmationMenuTrigger = createUniqueTriggerId('done')

  const confirmationMenu = Telegraf.Extra.markdown().markup(
    Markup.inlineKeyboard([
      Markup.callbackButton('✅', confirmationMenuTrigger),
    ]),
  )

  // Register the action
  bot.action(
    confirmationMenuTrigger,

    checkIsAdminMessage,

    /** @param {import('telegraf/typings/context').TelegrafContext & { state: any; answerCallbackQuery: any }} ctx */
    async function deleteBotAdminsMentionMsg(ctx) {
      if (ctx.callbackQuery) {
        const msg = ctx.callbackQuery.message
        if (msg) {
          return ctx.deleteMessage(msg.message_id)
        }
      }
      return ctx.answerCbQuery()
    },
  )

  /**
   * @param {import('telegraf/typings/context').TelegrafContext & { state: any; session: any }} ctx
   * @param {() => Promise<void>} next
   */
  const replyWithAdminsMention = async (ctx, next) => {
    const userMention = getUserMention(ctx.from, 'Markdown')

    const adminsMentionList = (await getChatAdmins(ctx)).map((chatMember) =>
      getUserMention(chatMember.user, 'Markdown'),
    )
    const adminsMention = adminsMentionList.join(',')

    ctx.reply(
      `🆘 ${userMention}, admins alertados!\n${adminsMention}`,
      confirmationMenu,
    )

    ctx.state.ok = true
    next()
  }

  return [checkIsGroup, replyWithAdminsMention, deleteMessage]
}

/** @type {import('./types').CommandDefinition} */
module.exports = {
  command: ['admins', 'admin'],
  description: "mention all available group's admin",
  makeMiddlewareChain,
}
