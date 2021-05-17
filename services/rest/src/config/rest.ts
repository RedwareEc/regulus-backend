import { Request, ResponseToolkit, Server } from '@hapi/hapi';
import { plugin, HapiRest, HapiRestAction } from '@redware/hapi-rest';
// import { GraphqlRegulus } from './graphql';
import { GluePlugin } from 'types';
// const BankAccounts = GraphqlRegulus.defineModel('BkAccounts', { id: 'BigInt' });

const rest: { plugins: GluePlugin[] } = {
  plugins: []
};
rest.plugins.push({
  plugin: '@regulus/banks-accounts',
  options: {
    instance: 'regulus'
  }
});

export { rest };
