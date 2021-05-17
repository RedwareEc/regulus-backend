// @ts-check
const { envPath } = require('@redware/js-utils');

const t = require('dotenv').config({ path: envPath() });

const Fastify = require('fastify');

const path = require('path');
const {
  postgraphile,
  PostGraphileResponseFastify3,
  PostGraphileResponse
} = require('postgraphile');
const postgraphile_plugin_connection_filter = require('postgraphile-plugin-connection-filter');
const postgraphile_plugin_nested_mutations = require('postgraphile-plugin-nested-mutations');
const pg_order_by_related = require('@graphile-contrib/pg-order-by-related');
const pg_simplify_inflector = require('@graphile-contrib/pg-simplify-inflector');
const pg_many_to_many = require('@graphile-contrib/pg-many-to-many');
const postgraphile_plugin_fulltext_filter = require('postgraphile-plugin-fulltext-filter');
const postgraphile_polymorphic_relation_plugin = require('postgraphile-polymorphic-relation-plugin');

/**
 * Env
 */
const PORT = process.env.GRAPHQL_PORT || 3015;
const GRAPHQL_URLS = process.env.GRAPHQL_URLS;
const SCHEMAS = process.env.GRAPHQL_SCHEMAS || ['public'];
const URL_BASE = process.env.GRAPHQL_BASE;
const DATABASES = process.env.GRAPHQL_DATABASES;
const isDev = process.env.NODE_ENV !== 'production';

/**
 * @type {{url:string,database:string,schemas:string[]}[]}
 */
const instances = [];
const allSchemas = typeof SCHEMAS === 'string' ? SCHEMAS.split('|') : SCHEMAS;

function getSchemas(index) {
  const schemasRaw = allSchemas[index];
  const schemas = schemasRaw ? schemasRaw.split(',') : ['public'];
  return schemas;
}
if (GRAPHQL_URLS) {
  const urls = GRAPHQL_URLS.split(',');
  for (let index = 0; index < urls.length; index++) {
    const url = urls[index];
    const database = url.substring(url.lastIndexOf('/') + 1);
    const schemas = getSchemas(index);
    instances.push({ url, database, schemas });
  }
} else if (DATABASES && URL_BASE) {
  const databases = DATABASES.split(',');
  for (let index = 0; index < databases.length; index++) {
    const database = databases[index];
    const schemas = getSchemas(index);
    instances.push({
      url: URL_BASE + '/' + database,
      database,
      schemas
    });
  }
} else {
  throw 'No env';
}

if (instances.length === 1) {
  instances[0].database = 'api';
}

/**
 * POSTGRES AND GRAPHQL
 * @type {any}
 */
const appendPlugins = [
  pg_simplify_inflector,
  postgraphile_plugin_connection_filter,
  // postgraphile_polymorphic_relation_plugin.postgraphilePolyRelationCorePlugin,
  postgraphile_plugin_fulltext_filter,
  pg_order_by_related,
  pg_many_to_many,
  postgraphile_plugin_nested_mutations
];

let middlewares = [];
for (let index = 0; index < instances.length; index++) {
  const instance = instances[index];
  const middleware = postgraphile(instance.url, instance.schemas, {
    graphiql: isDev,
    enhanceGraphiql: true,

    dynamicJson: true,
    simpleCollections: 'both',
    graphqlRoute: path.posix.join('/', instance.database, 'graphql'),
    graphiqlRoute: path.posix.join('/', instance.database, 'graphiql'),
    // Options
    graphileBuildOptions: {
      connectionFilterRelations: true,
      pgShortPk: false,
      pgSimplifyAllRows: false,
      connectionFilterPolymorphicForward: true,
      connectionFilterPolymorphicBackward: true
    },
    // Plugins
    appendPlugins
  });
  middlewares.push(middleware);
}
//@ts-ignore
const fastify = Fastify({
  logger: {
    prettyPrint: true
  }
});

/**
 * Converts a PostGraphile route handler into a Fastify request handler.
 */
const convertHandler = (handler) => (request, reply) =>
  handler(new PostGraphileResponseFastify3(request, reply));

for (const middleware of middlewares) {
  // OPTIONS requests, for CORS/etc
  fastify.options(
    middleware.graphqlRoute,
    convertHandler(middleware.graphqlRouteHandler)
  );

  // This is the main middleware
  fastify.post(
    middleware.graphqlRoute,
    convertHandler(middleware.graphqlRouteHandler)
  );

  // GraphiQL, if you need it
  if (middleware.options.graphiql) {
    if (middleware.graphiqlRouteHandler) {
      fastify.head(
        middleware.graphiqlRoute,
        convertHandler(middleware.graphiqlRouteHandler)
      );
      fastify.get(
        middleware.graphiqlRoute,
        convertHandler(middleware.graphiqlRouteHandler)
      );
    }
    // Remove this if you don't want the PostGraphile logo as your favicon!
    // if (middleware.faviconRouteHandler) {
    //   fastify.get(
    //     '/favicon.ico',
    //     convertHandler(middleware.faviconRouteHandler)
    //   );
    // }
  }
  // If you need watch mode, this is the route served by the
  // X-GraphQL-Event-Stream header; see:
  // https://github.com/graphql/graphql-over-http/issues/48
  if (middleware.options.watchPg) {
    if (middleware.eventStreamRouteHandler) {
      fastify.options(
        middleware.eventStreamRoute,
        convertHandler(middleware.eventStreamRouteHandler)
      );
      fastify.get(
        middleware.eventStreamRoute,
        convertHandler(middleware.eventStreamRouteHandler)
      );
    }
  }
}

fastify.listen(PORT, (err, address) => {
  if (err) {
    fastify.log.error(String(err));
    process.exit(1);
  }
  for (const middleware of middlewares) {
    fastify.log.info(
      `Graphql available at ${address}${middleware.graphqlRoute} 🚀`
    );
    if (isDev) {
      fastify.log.info(
        `Graphiql available at ${address}${middleware.graphiqlRoute} 🚀`
      );
    }
  }
});
