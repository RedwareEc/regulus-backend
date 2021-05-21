import path from 'path';
export const isProduction = process.env.NODE_ENV === 'production';
export const pathProject = path.resolve('..', '..');
export const pathServer = path.resolve('');
