import type { Model } from 'sequelize-typescript'
import Controller from '../core/controller'
import CommentModel from '../models/comment'
import CommentValidator from '../validators/comment'
import type { ICommentData } from '../types/comment'
import commentFilterset from '../filtersets/comment'

class CommentController extends Controller<ICommentData> {
  constructor() {
    super(CommentModel, CommentValidator, commentFilterset)
  }

  override async create(data: ICommentData, user: number): Promise<Model> {
    return await super.create({
      ...data,
      authorId: user,
    })
  }

  override async update(
    id: string,
    data: ICommentData,
    partial: boolean,
    user: number
  ): Promise<Model> {
    return await super.update(
      id,
      {
        ...data,
        authorId: user,
      },
      partial
    )
  }
}

export default new CommentController()
