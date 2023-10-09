import { roundToDecimal } from '../../helpers'

class Vector {
  constructor(protected _x: number, protected _y: number) {}

  get x() {
    return this._x
  }

  set x(value: number) {
    if (typeof value === 'number') {
      this._x = value
    }
  }

  get y() {
    return this._y
  }

  set y(value: number) {
    if (typeof value === 'number') {
      this._y = value
    }
  }

  add(vector: Vector) {
    const x = this._x + vector.x
    const y = this._y + vector.y
    return new Vector(x, y)
  }

  mul(constant: number) {
    const x = constant * this._x
    const y = constant * this._y
    return new Vector(x, y)
  }

  isEqual(vector: Vector) {
    return this._x === vector.x && this._y === vector.y
  }

  ceil() {
    const x = Math.ceil(this._x)
    const y = Math.ceil(this._y)
    return new Vector(x, y)
  }

  floor() {
    const x = Math.floor(this._x)
    const y = Math.floor(this._y)
    return new Vector(x, y)
  }

  round() {
    const x = Math.round(this._x)
    const y = Math.round(this._y)
    return new Vector(x, y)
  }

  roundToDecimal(n: number) {
    const x = roundToDecimal(this._x, n)
    const y = roundToDecimal(this._y, n)
    return new Vector(x, y)
  }
}

export default Vector
