class Validator<T> {
  constructor(protected _data: T, protected _partial = false) {
    this.validate = this.validate.bind(this)
  }

  get data() {
    return this._data
  }

  async validate() {
    throw new Error('Method not implemented')
  }
}

export default Validator
