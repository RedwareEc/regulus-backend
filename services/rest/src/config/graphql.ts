import { HapiPostgraphile } from '@redware/hapi-postgraphile';

export const postgraphile: HapiPostgraphile = {
  instances: {
    regulus: {
      endpoint: process.env.ENDPOINT_GRAPHQL!
    }
  }
};
