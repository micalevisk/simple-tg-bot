const { walkSync } = require('./helpers')

module.exports = (function importCommands() {
  /** @param {string} filepath */
  const isCommandModuleFile = (filepath) => filepath.endsWith('.command.js')

  const commands = Array.from(
    walkSync(__dirname, isCommandModuleFile),
  ).map((commandModuleAbsFile) => require(commandModuleAbsFile))

  return commands
})()
