interface MiddlewareFn<TContext extends TelegrafContext> {
  (ctx: TContext, next: () => Promise<void>): void | Promise<unknown>
}

export interface CommandDefinition {
  command: string | string[]
  description: string
  optsId: string | undefined
  makeMiddlewareChain: (
    bot: Telegraf<any>,
    commandOpts: any | undefined,
  ) => MiddlewareFn[]
}

export interface VagaOpts {
  chatIdToForwardMessages: string | number
  replyMsg: string
}
