const botConfig = require('./bot-config')
const { info } = require('./log')

const commandsOpts = new Map()
for (const commandId of ['vaga', 'java']) {
  commandsOpts.set(`${commandId}Opts`, botConfig.command[commandId])
}

const bot = require('./bot')(botConfig.token, commandsOpts)

bot.launch().then(() => {
  info('bot is up.')
})
