# simple-tg-bot

![CD](https://github.com/sistematico/simple-tg-bot/workflows/Continuous%20delivery/badge.svg?event=push)

## Bot available commands

| how                                         | what                                                                                                                                                                                 | who   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| reply some message with `/vaga` or `/vagas` | forwards the replied message to the chat id `CHAT_ID_TO_FORWARD_MESSAGES` (environment variable); reply the 'replied message' with `REPLY_MSG` (env. var.) and delete both messages. | admin |
| `/radmins`                                  | refreshs chat administrators in memory list, and delete the command message                                                                                                          | admin |

## setup

```bash
cp .env.example .env
vim .env # place your config values
```

## usage

```bash
npm ci --prod
export DEBUG=simple-tg-bot* # to diplay logs
# export DEBUG=simple-tg-bot:debug
# export DEBUG=simple-tg-bot:info
# export DEBUG=simple-tg-bot:info
npm start
```

## development usage

```bash
npm i
npm run dev

npm run format
```
