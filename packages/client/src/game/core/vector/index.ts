class Vector {
    constructor(protected _x: number, protected _y: number) { }

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
        this._x += vector.x
        this._y += vector.y
    }

    isEqual(vector: Vector) {
        return this._x === vector.x && this._y === vector.y
    }

    ceil() {
        return new Vector(
            Math.ceil(this._x),
            Math.ceil(this._y)
        )
    }

    floor() {
        return new Vector(
            Math.floor(this._x),
            Math.floor(this._y)
        )
    }
}

export default Vector
