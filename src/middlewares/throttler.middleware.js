const { telegrafThrottler } = require('telegraf-throttler')
const { error } = require('../log')

/**
 * @param {import('telegraf/typings/context').TelegrafContext & { state: any }} ctx
 * @param {() => Promise<void>} _next
 * @param {string} throttlerName
 * @param {Error} err
 */
const onThrottlerError = async (ctx, _next, throttlerName, err) => {
  error(
    `error in the throttle mechanism. from_id=%s throttler_name="%s" error="%s"`,
    ctx.message.from.id,
    throttlerName,
    err.message,
  )
}

module.exports = telegrafThrottler({
  onThrottlerError,

  // Incoming Throttler
  in: {
    minTime: 333, // Wait this many milliseconds to be ready, after a job
    highWater: 0, // Trigger strategy if throttler is not ready for a new job
    maxConcurrent: 1, // Only 1 job at a time
  },
  // Outgoing Private Throttler
  out: {
    minTime: 25, // Wait this many milliseconds to be ready, after a job
    reservoir: 2, // Number of new jobs that throttler will accept at start
    reservoirRefreshAmount: 2, // Number of jobs that throttler will accept after refresh
    reservoirRefreshInterval: 1000 * 1, // Interval in milliseconds where reservoir will refresh
  },
  // Outgoing Group Throttler
  group: {
    maxConcurrent: 1, // Only 1 job at a time
    minTime: 333, // Wait this many milliseconds to be ready, after a job
    reservoir: 2, // Number of new jobs that throttler will accept at start
    reservoirRefreshAmount: 2, // Number of jobs that throttler will accept after refresh
    reservoirRefreshInterval: 1000 * 60, // Interval in milliseconds where reservoir will refresh
  },
})
