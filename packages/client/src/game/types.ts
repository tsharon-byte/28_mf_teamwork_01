export type TLevel = string[]

export type TPosition = [number, number]

export enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

export type TDirection = keyof typeof Direction

export type TDirectionVectors = {
  up: [0, -1]
  down: [0, 1]
  left: [-1, 0]
  right: [1, 0]
}

export type TDirectionVector = TDirectionVectors[TDirection]

export enum GameEvent {
  StartGame = 'START_GAME',
  StopGame = 'STOP_GAME',
  GameOverSuccess = 'GAME_OVER_SUCCESS',
  GameOverFailure = 'GAME_OVER_FAILURE',
  BombermanMove = 'BOMBERMAN_MOVE',
  EnemyMove = 'ENEMY_MOVE',
}
