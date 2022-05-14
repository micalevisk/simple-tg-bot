# simple-tg-bot

## Bot available commands

| how                                         | what                                                                                                                                                                                                      | who      |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `/ping`                                     | check if the bot is alive. If it delete your command (private) message, then it is!                                                                                                                       | everyone |
| reply some message with `/vaga` or `/vagas` | forwards the replied message to the chat id `command.vaga.chatIdToForwardMessages` config; reply the 'replied message' with one of the `command.vaga.botResponses` config value and delete both messages. | admin    |
| `/radmins`                                  | refreshs chat administrators in memory list, and delete the command message                                                                                                                               | admin    |
| `/admins` or `/admin`                       | list (mentioning) all admin (non-bot) users in the group                                                                                                                                                  | everyone |
| `/java`                                     | reply the replied message with `command.java.replyWithMsg` config                                                                                                                                         | admin    |

## setup

```bash
git clone https://github.com/micalevisk/simple-tg-bot

cp .env.example .env
# Add your private Telegram bot token here
vim .env

# Configure your bot
vim config.json
```

## usage

```bash
npm ci --prod
export DEBUG=simple-tg-bot* # to diplay all kind of logs
# export DEBUG=simple-tg-bot:debug
# export DEBUG=simple-tg-bot:info
# export DEBUG=simple-tg-bot:info
export TELEGRAM_BOT_TOKEN="YOUR--TOKEN--HERE"
npm start
```

## development usage

```bash
npm install
```

> If you want to use the [VS Code debug mode](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)  
> <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> _(show Command Pallet)_ → `select and start debugging` → `Run 'npm run dev'`

```bash
# or
npm run dev
```

```bash
npm run format
```
