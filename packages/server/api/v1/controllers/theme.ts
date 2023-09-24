import type { Handler } from 'express'
import { Theme } from '../db'

export const getTheme: Handler = (req, res) => {
  const { userId } = req.params
  Theme.findOne({
    where: {
      userId: userId,
    },
    attributes: ['theme'],
  })
    .then(theme => {
      res.status(200).send(theme)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

export const changeTheme: Handler = (req, res) => {
  const { theme, userId } = req.body
  Theme.upsert({ theme, userId })
    .then(() => {
      return Theme.findOne({ where: { userId } })
    })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}
