import Viewset from '../core/viewset'
import type { ITopicData } from '../types/topic'
import topicController from '../controllers/topic'
import type { Request, Response } from 'express'
import { catchError } from '../core/viewset/decorators'

class TopicViewset extends Viewset<ITopicData> {
  constructor() {
    super(topicController)
  }

  @catchError
  override async create(req: Request, res: Response): Promise<void> {
    const instance = await this.controller.create(req.body, req.user?.id)
    res.status(201).json(instance)
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
    res.status(200).json(instance)
  }
}

export default new TopicViewset()
