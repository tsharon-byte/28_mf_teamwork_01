import * as path from 'path'

import { ENVS } from './env'

export const ROOT_DIR_FROM_SSR = path.join(__dirname, '../../')
export const ROOT_DIR_FROM_DIST_SERVER = path.join(__dirname, '..', '..')

export const ROOT_DIR = ENVS.__DEV__
  ? ROOT_DIR_FROM_DIST_SERVER
  : ROOT_DIR_FROM_SSR

export const SERVER_DIR = path.join(ROOT_DIR, 'server')
export const CLIENT_DIR = path.join(ROOT_DIR, 'client')
export const DIST_DIR = path.join(ROOT_DIR, 'client', 'dist')
export const DIST_SSR_DIR = path.join(ROOT_DIR, 'client', 'dist-ssr')
