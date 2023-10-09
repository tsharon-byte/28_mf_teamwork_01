import Controller from '../core/controller'
import type { IUserData } from '../types/user'
import { UserModel } from '../models'
import { UserValidator } from '../validators'
import { userFilterset } from '../filtersets'
import type { Model } from 'sequelize-typescript'

class UserController extends Controller<IUserData> {
  constructor() {
    super(UserModel, UserValidator, userFilterset)
  }

  override async update(
    yandexId: string,
    data: IUserData,
    partial: boolean
  ): Promise<Model> {
    const validator = new this.ValidatorClass(data, partial)
    await validator.validate()
    await this.model.update(
      { score: validator.data.score },
      { where: { yandexId } }
    )
    const inctance = await this.getInstance(yandexId)
    return inctance
  }
}

export default new UserController()
