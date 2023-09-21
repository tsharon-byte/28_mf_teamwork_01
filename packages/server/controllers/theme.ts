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
  Theme.update(
    { theme },
    {
      where: {
        userId: userId,
      },
    }
  )
    .then(() => {
      res.status(200).send({ theme })
    })
    .catch(error => {
      res.status(500).send(error)
    })
}
