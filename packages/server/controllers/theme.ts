import type { Handler } from 'express'
import { Theme } from '../db'

export const getTheme: Handler = (req, res) => {
  const userId = req.params.userId
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
  Theme.findOne({ where: { userId } })
    .then(data => {
      if (!data) {
        return Theme.create({ theme, userId })
      } else {
        return data.update({ theme })
      }
    })
    .then(updatedData => {
      res.status(200).send(updatedData)
    })
    .catch(error => {
      res.status(500).send(error)
    })
}