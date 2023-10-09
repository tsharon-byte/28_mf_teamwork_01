import { drawLevel, level1 } from '../utils/animation/helpers'
import { TLevel, GameEvent, Direction } from './types'
import { Nullable } from '../types'
import { Bomberman } from './characters'
import {
  Enemy,
  Balloom,
  Oneal,
  Doll,
  Minvo,
  Kondoria,
  Ovapi,
  Pass,
  Pontan,
} from './enemies'
import eventBus from './core/event-bus'
import { portalIsFound, getBurstWaveEndAction } from './helpers'
import { Bomb } from './items'
import { BurstWave, BurstWaveStart, BurstWaveMiddle, BurstWaveEnd } from './items/burst-waves'
import { DIRECTION_VECTORS } from './constants'
import { BurstWaveMiddleAction } from './items/burst-waves/burst-wave-middle/types'
import { WALL_CHARACTER } from '../utils/animation/constants'
import { Vector } from './core'

class Game {
  private static __instance: Game
  protected _context: Nullable<CanvasRenderingContext2D> = null
  protected _bomberman: Nullable<Bomberman> = null
  protected _enemies: Enemy[] = []
  protected _level: TLevel = level1
  protected _burstWaves: BurstWave[] = []

  constructor(protected _canvas: HTMLCanvasElement) {
    if (Game.__instance) {
      return Game.__instance
    }
    this._context = _canvas.getContext('2d')
    this._initMap()
    this._initBomberman()
    this._initEnemies()
    this._registerEvents()
    Game.__instance = this
  }

  protected _initMap() {
    if (this._context) {
      drawLevel(this._level, this._context)
    }
  }

  protected _initBomberman() {
    if (this._context) {
      this._bomberman = new Bomberman(this._context, this._level)
    }
  }

  protected _initEnemies() {
    if (this._context) {
      this._enemies.push(
        new Balloom(this._context, this._level, [13, 1]),
        new Oneal(this._context, this._level, [17, 1]),
        new Doll(this._context, this._level, [20, 1]),
        new Minvo(this._context, this._level, [27, 1]),
        new Kondoria(this._context, this._level, [29, 5]),
        new Ovapi(this._context, this._level, [20, 11]),
        new Pass(this._context, this._level, [14, 11]),
        new Pontan(this._context, this._level, [10, 11])
      )
    }
  }

  private _registerEvents(): void {
    eventBus.on(GameEvent.StartGame, this._start.bind(this))
    eventBus.on(GameEvent.StopGame, this._stop.bind(this))
    eventBus.on(GameEvent.GameOverSuccess, this._stop.bind(this))
    eventBus.on(GameEvent.GameOverFailure, this._stop.bind(this))
    eventBus.on(GameEvent.BombermanMove, this._handleBombermanMove.bind(this))
    eventBus.on(GameEvent.EnemyMove, this._handleEnemyMove.bind(this))
    eventBus.on(GameEvent.BombExploded, this._handleBombExploded.bind(this))
    eventBus.on(GameEvent.BurstWavePassed, this._handleBurstWavePassed.bind(this))
  }

  protected _start() {
    if (this._bomberman) {
      this._bomberman.start()
    }
    this._enemies.forEach(enemy => enemy.start())
  }

  protected _stop() {
    if (this._bomberman) {
      this._bomberman.stop()
    }
    this._enemies.forEach(enemy => enemy.stop())
  }

  protected _handleBombermanMove() {
    if (this._bomberman && portalIsFound(this._level, this._bomberman.position)) {
      eventBus.emit(GameEvent.GameOverSuccess)
      this._bomberman = null
    }
    this._bombermanIsKilledCheck()
  }

  protected _handleEnemyMove(enemy: Enemy) {
    this._gameOverFailureCheck(enemy)
    this._enemyIsKilledCheck(enemy)
  }

  protected _gameOverFailureCheck(enemy: Enemy) {
    if (this._bomberman && this._bomberman.position.isEqual(enemy.position)) {
      eventBus.emit(GameEvent.GameOverFailure)
    }
  }

  protected _enemyIsKilledCheck(enemy: Enemy) {
    if (
      this._burstWaves.some(
        burstWave =>
          burstWave.position.isEqual(enemy.position.ceil()) ||
          burstWave.position.isEqual(enemy.position.floor())
      )
    ) {
      enemy.dead()
    }
  }

  protected _bombermanIsKilledCheck() {
    if (
      this._burstWaves.some(
        burstWave =>
          this._bomberman && (
            burstWave.position.isEqual(this._bomberman.position.ceil()) ||
            burstWave.position.isEqual(this._bomberman.position.floor())
          )
      )
    ) {
      eventBus.emit(GameEvent.GameOverFailure)
    }
  }

  protected _handleBombExploded(bomb: Bomb) {
    if (this._context) {
      this._burstWaves.push(new BurstWaveStart(this._context, this._level, bomb.position))
      this._createBurstWaves(Direction.Up, bomb.position)
      this._createBurstWaves(Direction.Down, bomb.position)
      this._createBurstWaves(Direction.Left, bomb.position)
      this._createBurstWaves(Direction.Right, bomb.position)
      this._burstWaves.forEach(burstWave => burstWave.start())
      this._bombermanIsKilledCheck()
    }
  }

  protected _createBurstWaves(direction: Direction, positionVector: Vector) {
    let position = positionVector.add(DIRECTION_VECTORS[direction])
    if (this._level[position.y][position.x] !== WALL_CHARACTER && this._context) {
      this._burstWaves.push(
        new BurstWaveMiddle(
          this._context,
          this._level,
          position,
          ['Up', 'Down'].includes(direction)
            ? BurstWaveMiddleAction.BoomUpDown
            : BurstWaveMiddleAction.BoomLeftRight
        )
      )
      position = positionVector.add(DIRECTION_VECTORS[direction].mul(2))
      if (this._level[position.y][position.x] !== WALL_CHARACTER) {
        this._burstWaves.push(
          new BurstWaveEnd(
            this._context,
            this._level,
            position,
            getBurstWaveEndAction(direction)
          )
        )
      }
    }
  }

  protected _handleBurstWavePassed(burstWave: BurstWave) {
    this._burstWaves = this._burstWaves.filter(
      item => item !== burstWave
    )
  }
}

export default Game
