import Viewset from '../core/viewset'
import type { ICommentData } from '../types/comment'
import commentController from '../controllers/comment'
import type { Request, Response } from 'express'
import { catchError } from '../core/viewset/decorators'
import { HTTP_200_OK, HTTP_201_CREATED } from '../../../constants/status'

class CommentViewset extends Viewset<ICommentData> {
  constructor() {
    super(commentController)
  }

  @catchError
  override async create(req: Request, res: Response): Promise<void> {
    const instance = await this.controller.create(req.body, req.user?.id)
    res.status(HTTP_201_CREATED).json(instance)
  }

  @catchError
  override async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const instance = await this.controller.update(
      id,
      req.body,
      false,
      req.user?.id
    )
    res.status(HTTP_200_OK).json(instance)
  }
}

export default new CommentViewset()
