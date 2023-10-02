import express from 'express'
import { getEmojiList } from '../controllers/emoji'

const emojiRoute = express.Router()
emojiRoute.get('/', getEmojiList)
export default emojiRoute
