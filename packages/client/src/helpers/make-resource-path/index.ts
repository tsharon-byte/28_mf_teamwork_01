import { RETRIEVE_RESOURCE_URL } from '../../constants/urls'
import joinPath from '../join-path'

const API_URL = import.meta.env.VITE_API_URL

const makeResourcePath = (path?: string): string =>
  path ? joinPath(API_URL, RETRIEVE_RESOURCE_URL.replace('{path}', path)) : ''

export default makeResourcePath
