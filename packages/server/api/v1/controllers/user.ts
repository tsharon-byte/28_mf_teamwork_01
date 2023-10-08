import Controller from '../core/controller'
import type { IUserData } from '../types/user'
import { UserModel } from '../models'
import { UserValidator } from '../validators'
import { userFilterset } from '../filtersets'

class UserController extends Controller<IUserData> {
  constructor() {
    super(UserModel, UserValidator, userFilterset)
  }
}

export default new UserController()
