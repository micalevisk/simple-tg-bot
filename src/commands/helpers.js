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
