import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IEmoji {
  id: number
  name: string
  code: string
}

export const emojiModel: ModelAttributes<Model, IEmoji> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  code: {
    type: DataType.STRING,
    allowNull: false,
  },
}
