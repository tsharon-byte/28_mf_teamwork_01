import { drawLevel, level1 } from '../utils/animation/helpers'
import { TLevel, GameEvent } from './types'
import { Nullable } from '../types'
import { Bomberman } from './characters'
import { Enemy, Balloom, Oneal, Doll, Minvo, Kondoria, Ovapi, Pass, Pontan } from './enemies'
import eventBus from './core/event-bus'

class Game {
    private static __instance: Game
    protected _context: Nullable<CanvasRenderingContext2D> = null
    protected _bomberman: Nullable<Bomberman> = null
    protected _enemies: Enemy[] = []
    protected _level: TLevel = level1

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
    }

    protected _start() {
        if (this._bomberman) {
            this._bomberman.start()
        }
        this._enemies.forEach(
            enemy => enemy.start()
        )
    }

    protected _stop() {
        if (this._bomberman) {
            this._bomberman.stop()
        }
        this._enemies.forEach(
            enemy => enemy.stop()
        )
    }

    protected _handleBombermanMove() {
        //
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
        if (this._bomberman && this._bomberman.flames.some(flame => flame.position.isEqual(enemy.position.ceil()) || flame.position.isEqual(enemy.position.floor()))) {
            enemy.dead()
        }
    }
}

export default Game
