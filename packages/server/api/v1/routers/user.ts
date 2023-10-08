import { Router } from 'express'
import { userViewset } from '../viewsets'

const router = Router({ mergeParams: true })

router.get('/', userViewset.list)
router.post('/', userViewset.create)
router.get('/:id', userViewset.retrieve)
router.put('/:id', userViewset.update)
router.delete('/:id', userViewset.destroy)

export default router
