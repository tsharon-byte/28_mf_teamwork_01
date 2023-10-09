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
    }
  }

  yandexIdValidate() {
    if (!this._partial || this.data.yandexId) {
    }
  }
}

export default UserValidator
