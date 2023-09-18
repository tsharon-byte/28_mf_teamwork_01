import type { Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'
import { DataType } from 'sequelize-typescript'

export interface ThemeModel {
  id: number
  mode: string
}

export const themeModel: ModelAttributes<Model, ThemeModel> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mode: {
    type: DataType.STRING,
    allowNull: false,
  },
}
