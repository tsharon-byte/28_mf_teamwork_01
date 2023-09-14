import type { Request, Response } from 'express'
import type Controller from '../controller'
import { catchError } from './decorators'

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
    res.status(201).json(instance)
  }

  @catchError
  async destroy(req: Request, res: Response) {
    const { id } = req.params
    await this.controller.destroy(id)
    res.status(204).json()
  }

  @catchError
  async list(req: Request, res: Response) {
    const queryset = await this.controller.list(req.query)
    res.status(200).json(queryset)
  }

  @catchError
  async retrieve(req: Request, res: Response) {
    const { id } = req.params
    const instance = await this.controller.retrieve(id)
    res.status(200).json(instance)
  }

  @catchError
  async update(req: Request, res: Response) {
    const { id } = req.params
    const instance = await this.controller.update(id, req.body)
    res.status(200).json(instance)
  }

  @catchError
  async patch(req: Request, res: Response) {
    const { id } = req.params
    const instance = await this.controller.update(id, req.body, true)
    res.status(200).json(instance)
  }
}

export default Viewset
