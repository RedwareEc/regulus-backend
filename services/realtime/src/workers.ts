import { Plugin } from '@hapi/hapi';
import { makeWorkerUtils } from 'graphile-worker';

interface Options {
  connectionString: string;
  algorithm?: string;
}

export const plugin: Plugin<Options> = {
  version: '1.0.0',
  name: '@regulus/tasks',
  register: async (server, { connectionString }) => {
    const workerUtils = await makeWorkerUtils({
      connectionString
    });
    try {
      await workerUtils.migrate();

      await workerUtils.addJob(
        // Task identifier
        'hello',

        // Payload
        { name: 'Realtime' }

        // Optionally, add further task spec details here
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      server.decorate('server', 'worker', workerUtils as any);
    } finally {
      await workerUtils.release();
    }
  }
};

export default plugin;
