import type { ModelCtor } from 'sequelize-typescript'
import { Op, type FindAndCountOptions, Sequelize } from 'sequelize'
import type { ParsedQs } from 'qs'

class Filterset {
  protected _options: FindAndCountOptions = {}

  constructor(
    protected _model: ModelCtor,
    protected _fields: Record<string, string>,
    protected _searchField?: string
  ) {}

  get options(): FindAndCountOptions {
    return { ...this._options }
  }

  validate() {
    const attributes = this._model.getAttributes()
    Object.entries(this._fields).forEach(([field, _]) => {
      if (!attributes[field]) {
        throw new Error(`
                    Field ${field} cannot be used as a filter field for model ${this._model.name}.
                    Model ${this._model.name} has not attribute ${field}.
                `)
      }
    })
    if (this._searchField && !attributes[this._searchField]) {
      throw new Error(`
                Field ${this._searchField} cannot be used as a search field for model ${this._model.name}.
                Model ${this._model.name} has not attribute ${this._searchField}.
            `)
    }
  }

  setup(query: ParsedQs) {
    this.validate()
    this._options = {}
    this.setupFilters(query)
    this.setupPagination(query)
    this.setupSearch(query)
    this.setupOrdering(query)
  }

  setupFilters(query: ParsedQs) {
    Object.entries(this._fields).forEach(([field, lookup]) => {
      const value = query[field]
      if (typeof value === 'string') {
        if (lookup === 'exact') {
          this._options.where = {
            ...this._options.where,
            [field]: value === 'null' ? { [Op.is]: null } : value,
          }
        } else if (lookup === 'icontains') {
          this._options.where = {
            ...this._options.where,
            [field]: Sequelize.where(
              Sequelize.fn('lower', Sequelize.col(field)),
              { [Op.like]: `%${String(value).toLowerCase()}%` }
            ),
          }
        }
      }
    })
  }

  setupPagination(query: ParsedQs) {
    const { limit, offset } = query
    if (typeof limit === 'string' && typeof offset === 'string') {
      this._options.limit = parseInt(limit)
      this._options.offset = parseInt(offset)
    }
  }

  setupSearch(query: ParsedQs) {
    const { search } = query
    if (typeof search === 'string' && this._searchField) {
      this._options.where = {
        ...this._options.where,
        [this._searchField]: Sequelize.where(
          Sequelize.fn('lower', Sequelize.col(this._searchField)),
          { [Op.like]: `%${String(search).toLowerCase()}%` }
        ),
      }
    }
  }

  setupOrdering(query: ParsedQs) {
    const { ordering } = query
    if (typeof ordering === 'string' && ordering.length) {
      this._options.order = [
        ordering[0] === '-'
          ? [ordering.substring(1), 'DESC']
          : [ordering, 'ASC'],
      ]
    }
  }
}

export default Filterset
