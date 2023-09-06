import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
  name: string
}

export const userModel: ModelAttributes<Model, IUser> = {
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
}
