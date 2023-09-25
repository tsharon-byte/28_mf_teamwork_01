import type { Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'
import { DataType } from 'sequelize-typescript'

export interface ThemeModel {
  id: number
  theme: string
  userId: number
}

export const themeModel: ModelAttributes<Model, ThemeModel> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
  },
  userId: {
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  },
}
