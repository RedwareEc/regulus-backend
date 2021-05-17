import { Options } from 'hapi-pino';
const pino: Options = {
  prettyPrint: true,
  // logEvents: ['request-error', 'onPostStart', 'onPostStop'],
  level: 'debug'
};

export { pino };
