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

export const menu: Record<string, string> = {
  Главная: ROUTE_PATH.HOME,
  'Доска лидеров': ROUTE_PATH.LEADERBOARD,
  Форум: ROUTE_PATH.FORUM,
}
