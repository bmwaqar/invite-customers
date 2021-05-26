import { debug } from 'debug';
import { appName } from '../constants';
const logger = debug(appName);
export const log = logger;
export const info = logger.extend('Debug', ':');
export const error = logger.extend('Error', ':');
export const warn = logger.extend('Warn', ':');
