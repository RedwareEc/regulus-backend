import { Plugin } from '@hapi/hapi';
import { dependencies, pkg } from './config';
import { plugin as pluginRest } from '@redware/hapi-rest';
import {} from '@redware/hapi-postgraphile';
import { buildConnector, buildValidates } from '@regulus/rest-commons';
import Fragments from './fragments';

export const plugin: Plugin<{ instance: string }> = {
  pkg,
  dependencies,
  register: async (server, options) => {
    /**
     * Register Rest
     */
    await server.register({
      plugin: pluginRest,
      options: {
        path: 'accounts',
        connector: buildConnector(
          {
            instance: options.instance,
            model: 'BkAccounts',
            primaryKeys: {
              id: 'BigInt'
            }
          },
          buildValidates
        )
      },
      routes: {
        prefix: '/banks'
      }
    });

    const key = `${options.instance}.BkAccounts`;
    /**
     * Register Fragments
     */
    Fragments.register({ server, key });
  }
};
// declare module '@hapi/hapi' {}
