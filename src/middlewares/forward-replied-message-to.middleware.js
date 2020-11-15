const { error, debug } = require('../log')
const { makeMiddlewareWithBotInstance } = require('./helpers')

module.exports = makeMiddlewareWithBotInstance((bot) => {
  return forwardRepliedMessageTo

  /** @param {string|number} targetChatId */
  function forwardRepliedMessageTo(targetChatId) {
    if (!['string', 'number'].includes(typeof targetChatId)) {
      throw new TypeError(
        `'targetChatId' should be string or number (${targetChatId})`,
      )
    }

    /**
     * @param {import('telegraf/typings/telegram-types').Chat} chat
     */
    const willForwardToOriginChat = ({ id, username }) =>
      id === targetChatId || !username
        ? false
        : targetChatId.toString().slice(1).toLowerCase() === username

    return forwardRepliedMessage

    /**
     * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
     * @param {() => Promise<void>} next
     */
    async function forwardRepliedMessage(ctx, next) {
      ctx.state.ok = false

      const fromChatId = ctx.chat.id
      const repliedMessage = ctx.message.reply_to_message

      if (willForwardToOriginChat(ctx.chat)) {
        ctx.state.ok = false
        next()
        return
      }

      try {
        await bot.telegram.forwardMessage(
          targetChatId,
          fromChatId,
          repliedMessage.message_id,
          {
            disable_notification: false,
          },
        )
        debug(
          'message forward. from_id=%s message_id=%s to_chat_id=%s',
          ctx.message.message_id,
          repliedMessage.message_id,
          targetChatId,
        )

        ctx.state.ok = true
      } catch (err) {
        // Ignore errors
        error(
          'error while attempted to forward the replied message. from_id=%s message_id=%s to_chat_id=%s error="%s"',
          ctx.message.from.id,
          repliedMessage.message_id,
          targetChatId,
          err.message,
        )
      } finally {
        next()
      }
    }
  }
})
