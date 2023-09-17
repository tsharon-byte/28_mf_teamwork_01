import type { Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'
import { DataType } from 'sequelize-typescript'

export interface Theme {
  id: number
  mode: 'dark' | 'string'
}

export const themeModel: ModelAttributes<Model, Theme> = {
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
