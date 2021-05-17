import { RouteOptionsValidate } from '@hapi/hapi';
import Joi from 'joi';

const getPk = (type: 'String' | 'Int' | 'BigInt' = 'BigInt') => {
  switch (type) {
    case 'BigInt':
      return Joi.number().cast('string').required();
    case 'Int':
      return Joi.number().required();
    default:
      return Joi.string().required();
  }
};
const getQuery = () => {
  return {
    nameFragment: Joi.string().default('default'),
    fragment: Joi.string().optional()
  };
};
const create = (): RouteOptionsValidate => {
  return {
    query: Joi.object({
      ...getQuery()
    }).options({ stripUnknown: true }),
    payload: Joi.object().required()
  };
};
interface Options {
  type: 'String' | 'Int' | 'BigInt';
}
const readSingle = ({ type }: Options): RouteOptionsValidate => {
  return {
    query: Joi.object({
      ...getQuery()
    }).options({ stripUnknown: true }),
    params: Joi.object({
      id: getPk(type)
    })
  };
};

const readFind = ({ type }: Options): RouteOptionsValidate => {
  return {
    query: Joi.object({
      ...getQuery(),
      page: Joi.number().default(1),
      limit: Joi.number().default(50),
      list: Joi.boolean().default(false)
    }).options({ stripUnknown: true }),
    payload: Joi.object().required(),
    params: Joi.object({
      id: getPk(type)
    })
  };
};
const readCount = (): RouteOptionsValidate => {
  return {
    payload: Joi.object().required()
  };
};

const update = ({ type }: Options): RouteOptionsValidate => {
  return {
    query: Joi.object({
      ...getQuery()
    }).options({ stripUnknown: true }),
    payload: Joi.object().required(),
    params: Joi.object({
      id: getPk(type)
    })
  };
};

const _delete = ({ type }: Options): RouteOptionsValidate => {
  return {
    query: Joi.object({
      ...getQuery()
    }).options({ stripUnknown: true }),
    params: Joi.object({
      id: getPk(type)
    })
  };
};

export const validates = {
  create,
  readSingle,
  readFind,
  readCount,
  update,
  delete: _delete,
  deleteTemp: _delete
};
