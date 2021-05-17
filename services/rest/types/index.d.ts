import { PluginObject } from '@hapi/glue';
import { ServerRegisterOptions } from '@hapi/hapi';
export interface GluePlugin
  extends Omit<PluginObject, 'routes'>,
    Omit<ServerRegisterOptions, 'once'> {}
