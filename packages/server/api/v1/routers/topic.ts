import { Router } from 'express'
import { topicViewset } from '../viewsets'

const router = Router({ mergeParams: true })

router.post('/', topicViewset.create)
router.get('/', topicViewset.list)
router.get('/:id', topicViewset.retrieve)
router.put('/:id', topicViewset.update)
router.patch('/:id', topicViewset.patch)
router.delete('/:id', topicViewset.destroy)

export default router
