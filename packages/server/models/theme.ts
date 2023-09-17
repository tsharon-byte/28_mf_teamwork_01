import type { Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface Theme {
  mode: 'dark' | 'string'
}

export const themeModel: ModelAttributes<Model, Theme> = {
  mode: {
    type: 'dark',
    allowNull: false,
  },
}
