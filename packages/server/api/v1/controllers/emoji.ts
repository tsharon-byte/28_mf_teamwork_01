import type { Handler } from 'express'
import { Emoji } from '../../../db'

export const getEmojiList: Handler = (_, res) => {
  Emoji.findAll({
    attributes: ['id', 'name', 'code'],
  }).then(emojiList => {
    res.status(200).send(emojiList)
  })
}
