import Filterset from '../core/filterset'
import { UserModel } from '../models'

class UserFilterset extends Filterset {
  constructor() {
    super(UserModel, {}, 'yandexId')
  }
}

export default new UserFilterset()
