import type { Handler } from 'express'
import { EmojiModel } from '../models'

export const getEmojiList: Handler = (_, res) => {
  EmojiModel.findAll({
    attributes: ['id', 'name', 'code'],
  }).then(emojiList => {
    res.status(200).send(emojiList)
  })
}
