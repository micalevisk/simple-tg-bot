const { Telegraf } = require('telegraf')
const { error, info } = require('./log')

const { session } = require('./middlewares')

const commands = require('./commands')

/**
 * @param {string} botToken
 * @param {{ vagaOpts: import('./commands/types').VagaOpts }} commandsOpts
 */
function setupTelegramBot(botToken, commandsOpts) {
  const bot = new Telegraf(botToken)

  bot.catch((err, ctx) => {
    error(`Ooops, encountered an error for ${ctx.updateType}. err=%s`, err)
  })

  bot.use(session)

  for (const { makeMiddlewareChain, command, optsId } of commands) {
    const commandOpts =
      optsId in commandsOpts ? commandsOpts[optsId] : undefined
    const commandMiddlewares = makeMiddlewareChain(bot, commandOpts)
    bot.command(command, ...commandMiddlewares)
    info(`register command. commands=%s opts=%o`, command, commandOpts)
  }

  return bot
}

module.exports = setupTelegramBot
