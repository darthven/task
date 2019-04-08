import appRoot from 'app-root-path'
import { createLogger, transports, Logger } from 'winston'

import { DRYRUN } from './env.config'

const options: { error: object; info: object; console: object } = {
  error: {
    name: 'error-file',
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true
  },
  info: {
    name: 'info-file',
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

// IF DRYRUN ENABLED LOG CONFIGURATION IS EMPTY
const logger: Logger = DRYRUN
  ? createLogger({})
  : createLogger({
      transports: [
        new transports.File(options.error),
        new transports.File(options.info),
        new transports.Console(options.console)
      ],
      exitOnError: false
    })

export default logger
