# simple-tg-bot

## Bot available commands

| how                                         | what                                                                                                                                                                                 | who      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `/ping`                                     | check if the bot is alive. If it delete your command (private) message, then it is!                                                                                                  | everyone |
| reply some message with `/vaga` or `/vagas` | forwards the replied message to the chat id `CHAT_ID_TO_FORWARD_MESSAGES` (environment variable); reply the 'replied message' with `REPLY_MSG` (env. var.) and delete both messages. | admin    |
| `/radmins`                                  | refreshs chat administrators in memory list, and delete the command message                                                                                                          | admin    |
| `/admins` or `/admin`                       | list (mentioning) all admin (non-bot) users in the group                                                                                                                             | everyone |
| `/java`                                     | reply the replied message with `REPLY_JAVA_CMD_MSG` (env. var)                                                                                                                       | admin    |

## setup

```bash
git clone --depth=1 https://github.com/sistematico/simple-tg-bot

cp .env.example .env
vim .env # add your telegram bot token here

# Configuration your bot with this file
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
