import { Router } from 'express'
import { commentViewset } from '../viewsets'

const router = Router()

router.post('/', commentViewset.create)
router.get('/', commentViewset.list)
router.get('/:id', commentViewset.retrieve)
router.put('/:id', commentViewset.update)
router.patch('/:id', commentViewset.patch)
router.delete('/:id', commentViewset.destroy)

export default router
