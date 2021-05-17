import dotenv from 'dotenv';
import Joi from 'joi';
import { envPath } from '@redware/js-utils';

dotenv.config({ path: envPath() });
process.env.CONSOLA_LEVEL = '6';
/**
 * Define Schema
 */
const env = {
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().required()
};

/**
 * Verify schema
 */
try {
  Joi.assert(process.env, Joi.object(env), { allowUnknown: true });
} catch (error) {
  console.error(error.details);
  process.exit(1);
}
/**
 * Parse ENV
 */
for (const key in env) {
  process.env[key] = Joi.attempt(process.env[key], (env as any)[key]);
}
/**
 * Add extra functions
 */
