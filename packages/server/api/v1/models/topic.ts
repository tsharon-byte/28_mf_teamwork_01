import { DataType, Model, Table, Column } from 'sequelize-typescript'

@Table({
  tableName: 'topics',
  modelName: 'topic',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class TopicModel extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'author_id',
  })
  authorId!: number

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name!: string

  @Column({
    type: DataType.STRING(2047),
  })
  description!: string
}

export default TopicModel
