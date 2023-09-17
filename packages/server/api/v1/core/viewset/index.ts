import type { Request, Response } from 'express'
import type Controller from '../controller'
import { catchError } from './decorators'
import {
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
} from '../../../../constants/status'

class Viewset<T extends Record<string, any>> {
  constructor(protected controller: Controller<T>) {
    this.create = this.create.bind(this)
    this.destroy = this.destroy.bind(this)
    this.list = this.list.bind(this)
    this.retrieve = this.retrieve.bind(this)
    this.update = this.update.bind(this)
    this.patch = this.patch.bind(this)
  }

  @catchError
  async create(req: Request, res: Response) {
    const instance = await this.controller.create(req.body)
    res.status(HTTP_201_CREATED).json(instance)
  }

  @catchError
  async destroy(req: Request, res: Response) {
    const { id } = req.params
    await this.controller.destroy(id)
    res.status(HTTP_204_NO_CONTENT).json()
  }

  @catchError
  async list(req: Request, res: Response) {
    const queryset = await this.controller.list(req.query)
    res.status(HTTP_200_OK).json(queryset)
  }

  @catchError
  async retrieve(req: Request, res: Response) {
    const { id } = req.params
    const instance = await this.controller.retrieve(id)
    res.status(HTTP_200_OK).json(instance)
  }

  @catchError
  async update(req: Request, res: Response) {
    const { id } = req.params
    const instance = await this.controller.update(id, req.body)
    res.status(HTTP_200_OK).json(instance)
  }

  @catchError
  async patch(req: Request, res: Response) {
    const { id } = req.params
    const instance = await this.controller.update(id, req.body, true)
    res.status(HTTP_200_OK).json(instance)
  }
}

export default Viewset
