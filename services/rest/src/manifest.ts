import Glue from '@hapi/glue';
import { Server } from '@hapi/hapi';
import { Manifest } from '@hapi/glue';
import * as Options from './config';

const manifest: Manifest = {
  server: {
    port: process.env.PORT,
    routes: {
      cors: process.env.NODE_ENV !== 'production'
    }
  },
  register: {
    plugins: [
      {
        plugin: 'hapi-pino',
        options: Options.pino
      },
      {
        plugin: '@redware/hapi-postgraphile',
        options: Options.postgraphile
      },
      ...Options.rest.plugins
    ]
  }
};

export const initManifest = async (): Promise<Server> => {
  return await Glue.compose(manifest, {
    relativeTo: __dirname
  });
};

export const afterManifest = async (server: Server): Promise<void> => {
  await server.register({
    plugin: require('hapi-pulse'),
    options: {
      // any option that is supported by hapi's "server.stop()"
      timeout: 15000,
      // plugin specific options
      logger: console,
      signals: ['SIGINT']
    }
  });
};

export default { initManifest, afterManifest };
