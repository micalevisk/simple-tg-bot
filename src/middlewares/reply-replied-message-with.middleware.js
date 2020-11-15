const { error, debug } = require('../log')
const { makeMiddlewareWithBotInstance, getUserMention } = require('./helpers')

module.exports = makeMiddlewareWithBotInstance((bot) => {
  /** @param {string} msgText */
  const replyRepliedMessageWith = (msgText) => {
    if (!msgText || !msgText.trim() || typeof msgText !== 'string') {
      throw new TypeError(
        `'msgText' should be a non-empty string and non-falsy value! (${msgText})`,
      )
    }

    return replyRepliedMessage

    /**
     * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
     * @param {() => Promise<void>} next
     */
    async function replyRepliedMessage(ctx, next) {
      ctx.state.ok = false

      const chatId = ctx.chat.id
      const repliedMessage = ctx.message.reply_to_message

      try {
        const userMention = getUserMention(ctx.from, 'HTML')
        const text = (userMention ? `${userMention} ` : '') + msgText
        await bot.telegram.sendMessage(chatId, text, {
          reply_to_message_id: repliedMessage.message_id,
          disable_notification: false,
          disable_web_page_preview: true,
          parse_mode: 'HTML',
        })
        debug(
          'bot replies to the replied message. from_id=%s message_id=%s',
          ctx.message.message_id,
          repliedMessage.message_id,
        )

        ctx.state.ok = true
      } catch (err) {
        // Ignore errors
        error(
          'error while attempted to reply the replied message. from_id=%s message_id=%s error="%s"',
          ctx.message.from.id,
          repliedMessage.message_id,
          err.message,
        )
      } finally {
        next()
      }
    }
  }

  return replyRepliedMessageWith
})
