// import { PluginObject } from '@hapi/glue';
// import { PluginOptions as Api } from '@redware/hapi-postgraphile-api';
// import Commons, { PreGuardDelete } from '@redware/regulus-api-commons';
// /**
//  * Plugins
//  */
// import ControlChanges from '@redware/regulus-api-changes';

// interface EnvModels {
//   MODEL: string;
//   PK: string;
//   PK_TYPE: 'BigInt' | 'Int' | 'String';
//   NAMESPACE?: string;
// }

// export const ApiList = (): EnvModels[] => {
//   return typeof process.env.MODELS === 'string'
//     ? JSON.parse(process.env.MODELS)
//     : [];
// };

// const omitShared = ['BkAccountBalances'];

// export const apis = ApiList()
//   .map<Api>((api) => {
//     const commons: any[] = [];
//     if (Commons[api.MODEL]) {
//       commons.push(Commons[api.MODEL]);
//       if (omitShared.indexOf(api.MODEL) === -1) {
//         // console.log('++++++++++Insert shared ++++++++', a.MODEL);
//         commons.push(PreGuardDelete);
//       }
//     }

//     return {
//       instance: 'regulus',
//       model: api.MODEL || 'Warehouses',
//       namespace: api.NAMESPACE,
//       primaryKey: {
//         key: api.PK || 'id',
//         type: api.PK_TYPE || 'BigInt'
//       },
//       commons,
//       plugins: [ControlChanges]
//     };
//   })
//   .map<PluginObject>((options) => {
//     return {
//       plugin: '@redware/hapi-postgraphile-api',
//       options,
//       routes: {
//         prefix: process.env.ROUTE_PREFIX
//       }
//     };
//   });

// export default apis;
