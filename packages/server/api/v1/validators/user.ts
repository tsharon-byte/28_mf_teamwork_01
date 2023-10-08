import Validator from '../core/validator'
import type { IUserData } from '../types/user'

class UserValidator extends Validator<IUserData> {
  constructor(data: IUserData, partial: boolean) {
    super(data, partial)
  }

  override async validate() {
    this.yandexIdValidate()
    this.nameValidate()
  }

  nameValidate() {
    if (!this._partial || this.data.name) {
      if (typeof this.data.name === 'undefined') {
        throw new Error('name is required field')
      }
      if (this.data.name === null) {
        throw new Error('name should not be null')
      }
      if (!this.data.name.trim()) {
        throw new Error('name should not be empty string')
      }
    }
  }

  yandexIdValidate() {
    if (!this._partial || this.data.yandexId) {
      if (typeof this.data.yandexId === 'undefined') {
        throw new Error('yandexId is required field')
      }
      if (this.data.yandexId === null) {
        throw new Error('yandexId should not be null')
      }
    }
  }
}

export default UserValidator
