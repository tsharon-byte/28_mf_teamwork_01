import type { Handler } from 'express'
import { Theme } from '../db'

export const getTheme: Handler = (_, res) => {
  Theme.findOne({
    attributes: ['mode'],
    order: [['id', 'DESC']],
  }).then(mode => {
    res.status(200).send(mode)
  })
}
