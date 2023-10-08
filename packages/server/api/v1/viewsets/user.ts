import Viewset from '../core/viewset'
import type { IUserData } from '../types/user'
import { userController } from '../controllers'

class UserViewset extends Viewset<IUserData> {
  constructor() {
    super(userController)
  }
}

export default new UserViewset()
