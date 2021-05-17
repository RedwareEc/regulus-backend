import { Server } from '@hapi/hapi';
import { CrudOperations } from '@redware/hapi-rest';
import {
  Postgraphile,
  PostgraphileModelMethods
} from '@redware/hapi-postgraphile';
import * as R from 'ramda';
export { validates } from './validates';
import { validates } from './validates';
interface Options {
  instance: string;
  model: string;
  primaryKeys: Record<string, string>;
}

export const buildConnector = (
  optionsConnector: Options,
  ...partials: ((options: Options) => Partial<CrudOperations>)[]
) => (server: Server) => {
  const { instance, model, primaryKeys } = optionsConnector;
  const buildHandler = (
    method: PostgraphileModelMethods,
    options?: Partial<Postgraphile.HandlerOptions>
  ): { postgraphile: Postgraphile.HandlerOptions } => {
    return {
      postgraphile: {
        ...options,
        instance,
        method,
        model: {
          name: model,
          primaryKeys
        }
      }
    };
  };
  const actions: Partial<CrudOperations> = {
    create: {
      handler: buildHandler('create')
    },
    readSingle: {
      handler: buildHandler('findByPk')
    },
    readFind: {
      handler: buildHandler('findAll')
    },
    readCount: {
      handler: buildHandler('count')
    },
    update: {
      handler: buildHandler('updateByPk')
    },
    delete: {
      handler: buildHandler('deleteByPk')
    },
    deleteTemp: {
      handler: buildHandler('updateByPk', { payload: { delete: true } })
    }
  };

  return R.reduce(
    (prev, current) => {
      return R.mergeDeepLeft(prev, current(optionsConnector)) as any;
    },
    actions,
    partials
  );

  // const _partials = R.flatten([partials || [], (options: Options) => actions]);
  // console.log(_partials);

  // return _partials.reduce((prev: any, current) => {
  //   console.log(prev, current);
  //   console.log(typeof prev);

  //   return R.mergeDeepRight(
  //     prev?.(optionsConnector) || {},
  //     current?.(optionsConnector) || {}
  //   );
  // }, []);
};

export const buildValidates = (options: Options): Partial<CrudOperations> => {
  const type: any = options.primaryKeys[Object.keys(options.primaryKeys)[0]];
  return {
    create: {
      options: {
        validate: validates.create()
      }
    },
    readSingle: {
      options: {
        validate: validates.readSingle({ type })
      }
    },
    readFind: {
      options: {
        validate: validates.readFind({ type })
      }
    },
    readCount: {
      options: {
        validate: validates.readCount()
      }
    },
    update: {
      options: {
        validate: validates.update({ type })
      }
    },
    delete: {
      options: {
        validate: validates.delete({ type })
      }
    },
    deleteTemp: {
      options: {
        validate: validates.delete({ type })
      }
    }
  };
};
