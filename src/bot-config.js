const path = require('path')
const Ajv = require('ajv').default

const { readJson } = require('./utils')
const {
  TELEGRAM_BOT_TOKEN,
  CONFIG_PATH = path.join(__dirname, '..', 'config.json'),
} = process.env

const ajv = new Ajv()

const configSchema = readJson(path.join(__dirname, '..', 'config.schema.json'))
const config = readJson(CONFIG_PATH)

const validate = ajv.compile(configSchema)
const isValidConfigFile = validate(config)
if (!isValidConfigFile) {
  throw validate.errors
}

module.exports = {
  token: TELEGRAM_BOT_TOKEN,
  // @ts-ignore
  ...config,
}
