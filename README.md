# simple-tg-bot

![CD](https://github.com/sistematico/simple-tg-bot/workflows/Continuous%20deploy/badge.svg?event=push)

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
cp .env.example .env
vim .env # place your config. values in this file
```

## usage

```bash
npm ci --prod
export DEBUG=simple-tg-bot* # to diplay all kind of logs
# export DEBUG=simple-tg-bot:debug
# export DEBUG=simple-tg-bot:info
# export DEBUG=simple-tg-bot:info
npm start
```

## development usage

```bash
npm i
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

## production usage

```bash
cp .production.deploy.env.example .production.deploy.env
vim .production.deploy.env # configure your production server

vim pm2.config.js # configure your Git repository

# Make your first deploy and populate the distant path
npm run deploy setup
##             ^^^^^ remove this for further deployments
```
