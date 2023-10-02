import { Router } from 'express'
import { commentViewset } from '../viewsets'
import {
  addEmojiToComment,
  getEmojiForComment,
} from '../controllers/commentsEmoji'

const router = Router()

router.post('/', commentViewset.create)
router.get('/', commentViewset.list)
router.get('/:id', commentViewset.retrieve)
router.put('/:id', commentViewset.update)
router.patch('/:id/emoji', addEmojiToComment)
router.get('/:id/emoji', getEmojiForComment)
router.patch('/:id', commentViewset.patch)
router.delete('/:id', commentViewset.destroy)

export default router
