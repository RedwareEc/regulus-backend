import Manifest from './manifest';

export const init = async () => {
  try {
    const server = await Manifest.initManifest();
    await Manifest.afterManifest(server);
    server.ext('onPreResponse', (request, h) => {
      const response: any = request.response;
      if (!response.isBoom) {
        return h.continue;
      }
      if (response.data) {
        response.output.payload.data = response.data;
      }
      //
      return response;
    });
    server.table().map((route) => {
      if (route.settings.app?.crud) {
        console.log(
          `${route.method}::${route.path} => ${JSON.stringify(
            route.settings.app.crud
          )}`
        );
      }
    });

    // console.log(server.app.postgraphile.models);

    return server;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
