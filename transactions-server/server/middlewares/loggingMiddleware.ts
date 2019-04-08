import { Middleware, KoaMiddlewareInterface, HttpError } from 'routing-controllers'
import { ParameterizedContext } from 'koa'

import logger from '../config/winston.config'

@Middleware({ type: 'before' })
export class LoggingMiddleware implements KoaMiddlewareInterface {
  public async use(ctx: ParameterizedContext, next: (err?: any) => Promise<any>): Promise<void> {
    logger.info(`${ctx.method} ${ctx.url}`, {
      body: ctx.request.body,
      ip: ctx.ip,
      date: new Date()
    })
    try {
      await next()
    } catch (err) {
      if (err instanceof HttpError) {
        logger.error({ ...err, ...{ ip: ctx.ip, date: new Date() } })
        ctx.body = err
        ctx.status = err.httpCode
      } else {
        logger.error(err.message)
        ctx.body = { message: 'Unexpected error' }
        ctx.status = 500
      }
    }
  }
}
