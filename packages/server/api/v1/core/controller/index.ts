import type { ParsedQs } from 'qs'
import type { ModelCtor } from 'sequelize-typescript'
import type Validator from '../validator'
import type Filterset from '../filterset'

class Controller<T extends Record<string, any>> {
  constructor(
    protected model: ModelCtor,
    protected ValidatorClass: typeof Validator<T>,
    protected filterset: Filterset
  ) {
    this.create = this.create.bind(this)
    this.destroy = this.destroy.bind(this)
    this.list = this.list.bind(this)
    this.retrieve = this.retrieve.bind(this)
    this.update = this.update.bind(this)
  }

  async getInstance(id: string) {
    const instance = await this.model.findByPk(id)
    if (!instance) {
      throw new Error('not found')
    }
    return instance
  }

  async create(data: T, ..._: any[]) {
    const validator = new this.ValidatorClass(data)
    await validator.validate()
    const inctance = await this.model.create(validator.data)
    return inctance
  }

  async destroy(id: string) {
    await this.getInstance(id)
    await this.model.destroy({ where: { id } })
  }

  async list(query: ParsedQs) {
    this.filterset.setup(query)
    const queryset = await this.model.findAndCountAll(this.filterset.options)
    return queryset
  }

  async retrieve(id: string) {
    const inctance = await this.getInstance(id)
    return inctance
  }

  async update(id: string, data: T, partial = false, ..._: any[]) {
    const validator = new this.ValidatorClass(data, partial)
    await validator.validate()
    await this.model.update(validator.data, { where: { id } })
    const inctance = await this.getInstance(id)
    return inctance
  }
}

export default Controller
