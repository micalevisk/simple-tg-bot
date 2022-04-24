const { walkSync } = require('./helpers')

function loadCommands() {
  /** @param {string} filepath */
  const isCommandModuleFile = (filepath) => filepath.endsWith('.command.js')

  const commands = Array.from(walkSync(__dirname, isCommandModuleFile)).map(
    (commandModuleAbsFile) => require(commandModuleAbsFile),
  )

  return commands
}

module.exports = loadCommands()
