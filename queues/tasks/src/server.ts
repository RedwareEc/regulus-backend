import './env';
import { run, quickAddJob } from 'graphile-worker';
const connectionString = process.env.ENDPOINT_WORKER;

async function main() {
  // Run a worker to execute jobs:
  const runner = await run({
    connectionString,
    concurrency: 5,
    // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
    noHandleSignals: false,
    pollInterval: 1000,
    // you can set the taskList or taskDirectory but not both
    taskList: {
      hello: async (payload, helpers) => {
        const { name } = payload as any;
        helpers.logger.info(`Hello, ${name}`);
      }
    }
  });

  await quickAddJob(
    // makeWorkerUtils options
    { connectionString },

    // Task identifier
    'hello',

    // Payload
    { name: 'Bobby Tables' }
  );

  // If the worker exits (whether through fatal error or otherwise), this
  // promise will resolve/reject:
  await runner.promise;
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
