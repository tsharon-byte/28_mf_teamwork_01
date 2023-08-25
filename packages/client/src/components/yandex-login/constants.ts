import { REDIRECT_URI } from '../../hooks/use-oauth/constants'

export const AUTHORIZE_URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id={client_id}&redirect_uri=${REDIRECT_URI}`
