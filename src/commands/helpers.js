const fs = require('fs')
const path = require('path')

/**
 * Interceptor middleware to check wheter or not it should call the next
 * middleware in the chain when the last middleware fail when doing its task.
 * @param {boolean} [ignoreErrors = true]
 */
module.exports.continueOnLastMiddlewareError = (ignoreErrors = true) => {
  return callNextMiddleware

  /**
   * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
   * @param {() => Promise<void>} next
   */
  function callNextMiddleware(ctx, next) {
    if (ctx.state.ok === false) {
      // last middleware was not succeed
      if (!ignoreErrors) {
        return
      }
    }
    next()
  }
}

/**
 * Walk through a directory recursively (in a depth-first manner).
 * (c) {@link https://gist.github.com/lovasoa/8691344}
 * @param {string} dirPath
 */
module.exports.walkSync = function* walkSync(
  dirPath,
  includeFile = (filePath) => true,
) {
  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const filepath = path.join(dirPath, file)
    const fileStats = fs.statSync(filepath)
    if (fileStats.isDirectory()) {
      yield* walkSync(filepath, includeFile)
    } else {
      if (includeFile(filepath)) {
        yield filepath
      }
    }
  }
}
