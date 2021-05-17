import { HapiPostgraphile, Postgraphile } from '@redware/hapi-postgraphile';
import { plugin, HapiRestAction, CrudOperations } from '@redware/hapi-rest';
import { Request, ResponseToolkit, Server } from '@hapi/hapi';

export const postgraphile: HapiPostgraphile = {
  instances: {
    regulus: {
      endpoint: '/'
    }
  }
};
