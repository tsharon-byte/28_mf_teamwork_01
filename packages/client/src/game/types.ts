import type Sprite from '../utils/animation/Sprite'
import type { Vector } from './core'

export type TLevel = string[]

export type TPosition = [number, number]

export enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

export type TDirection = keyof typeof Direction

export type TDirectionVector = Record<TDirection, Vector>

export enum GameEvent {
  StartGame = 'StartGame',
  StopGame = 'StopGame',
  GameOverSuccess = 'GameOverSuccess',
  GameOverFailure = 'GameOverFailure',
  BombermanMove = 'BombermanMove',
  EnemyMove = 'EnemyMove',
  BurstWavePassed = 'BurstWavePassed',
  BombExploded = 'BombExploded',
  BombHasBeenPlanted = 'BombHasBeenPlanted',
  EnemyKilled = 'EnemyKilled',
}

export interface ISpriteConstants {
  PATH: string
  TAILS_NUMBER: number
  TAIL_SIZE: number
  ANIMATION_SPEED: number
}

export type TActionSpriteMap<TAction extends string> = Record<TAction, Sprite>

export type TActionSpriteConstantsMap<TAction extends string> = Record<
  TAction,
  ISpriteConstants
>

export enum MoveAction {
  MoveUp = 'MoveUp',
  MoveDown = 'MoveDown',
  MoveLeft = 'MoveLeft',
  MoveRight = 'MoveRight',
}

export type TMoveAction = keyof typeof MoveAction

export enum DeathAction {
  Death = 'Death',
}

export type TDeathAction = keyof typeof DeathAction

export enum TurnAction {
  TurnFace = 'TurnFace',
  TurnBack = 'TurnBack',
  TurnLeft = 'TurnLeft',
  TurnRight = 'TurnRight',
}

export type TTurnAction = keyof typeof TurnAction

export type TScore = {
  score: number
}
