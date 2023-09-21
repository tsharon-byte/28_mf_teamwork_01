import type { Handler } from 'express'
import { Theme } from '../db'

export const getTheme: Handler = (_, res) => {
  Theme.findAll({
    attributes: ['mode'],
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
  Theme.update(
    { id: 1, mode },
    {
      where: {
        id: 1,
      },
    }
  )
    .then(() => {
      res.status(200).send({ mode })
    })
    .catch(error => {
      res.status(500).send(error)
    })
}
