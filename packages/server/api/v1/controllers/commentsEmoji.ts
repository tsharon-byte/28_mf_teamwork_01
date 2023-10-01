import type { Handler } from 'express'
import { CommentEmojiModel, EmojiModel } from '../models'

export const addEmojiToComment: Handler = (req, res) => {
  console.log(req.params, 'req.params')
  console.log(req.body, 'req.body')
  const { id } = req.params
  const { emoji_id, author_id } = req.body
  CommentEmojiModel.create({
    comment_id: id,
    emoji_id,
    author_id,
  })
    .then(() => {
      res.status(200).send({ message: 'OK' })
    })
    .catch(() => {
      res.status(500).send({ message: 'NOK' })
    })
}
export const getEmojiForComment: Handler = (req, res) => {
  CommentEmojiModel.findAll({
    include: [EmojiModel],
    where: {
      comment_id: +req.params.id,
    },
    //attributes: ['emoji'],
  })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'NOK' })
    })
}
