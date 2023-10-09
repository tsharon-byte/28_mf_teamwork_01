export enum ROUTE_PATH {
  'HOME' = '/',
  'LOGIN' = '/login',
  'REGISTRATION' = '/registration',
  'PROFILE' = '/profile',
  'GAME' = '/game',
  'LEADERBOARD' = '/leaderboard',
  'FORUM' = '/forum',
  'ENDGAME' = '/end-game',
  'ERROR' = '/error',
  'SERVER_ERROR' = '/server-error',
}

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const GAME_DURATION = 60
