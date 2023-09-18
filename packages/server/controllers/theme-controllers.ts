import type { Handler } from 'express'
import { Theme } from '../db'

export const getTheme: Handler = (_, res) => {
  Theme.findAll({
    attributes: ['id', 'mode'],
  }).then(theme => {
    res.status(200).send(theme)
  })
}
