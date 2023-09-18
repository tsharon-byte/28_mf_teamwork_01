import type { Handler } from 'express'
import { Theme } from '../db'

export const getTheme: Handler = (_, res) => {
  Theme.findOne({
    attributes: ['mode'],
    order: [['id', 'DESC']],
  })
    .then(mode => {
      res.status(200).send(mode)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

export const changeTheme: Handler = (req, res) => {
  const { mode } = req.body
  Theme.create({ mode })
    .then(() => {
      res.status(200).send({ mode })
    })
    .catch(error => {
      res.status(500).send(error)
    })
}
