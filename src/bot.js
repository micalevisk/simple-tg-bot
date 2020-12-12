const { Telegraf } = require('telegraf')
const { error, info } = require('./log')

const { session, throttler } = require('./middlewares')

/**
 * @param {string} botToken
 * @param {Map<string, any>} commandsOpts
 */
function setupTelegramBot(botToken, commandsOpts) {
  const commands = require('./commands')

  const bot = new Telegraf(botToken)

  bot.catch((err, ctx) => {
    error(`oops, encountered an error for ${ctx.updateType}. err=%s`, err)
  })

  bot.use(session)

  bot.use(throttler)

  // Ignore all pending `callback_query` events.
  bot.use(async function disposeCallbackQuery(ctx, next) {
    if (!ctx.callbackQuery) return next()
    await next()
    return ctx.answerCbQuery()
  })

  for (const { makeMiddlewareChain, command, optsId } of commands) {
    const commandOpts = commandsOpts.get(optsId)

    const commandMiddlewares = makeMiddlewareChain(bot, commandOpts)

    bot.command(command, ...commandMiddlewares)

    info(`register command. commands=%s opts=%o`, command, commandOpts)
  }

  return bot
}

module.exports = setupTelegramBot
