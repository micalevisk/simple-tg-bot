require('dotenv').config()

const { info } = require('./log')

const {
  TELEGRAM_BOT_TOKEN,
  CHAT_ID_TO_FORWARD_MESSAGES,
  REPLY_MSG,
} = process.env

const commandsOpts = Object.create(null)

commandsOpts['vagaOpts'] = {
  chatIdToForwardMessages: CHAT_ID_TO_FORWARD_MESSAGES,
  replyMsg: REPLY_MSG,
}

const bot = require('./bot')(TELEGRAM_BOT_TOKEN, commandsOpts)

bot.launch().then(() => {
  info('bot is up.')
})
