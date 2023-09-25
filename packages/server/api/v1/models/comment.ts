import {
  DataType,
  Model,
  Table,
  Column,
  ForeignKey,
} from 'sequelize-typescript'
import TopicModel from './topic'

@Table({
  tableName: 'comments',
  modelName: 'comment',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class CommentModel extends Model {
  @ForeignKey(() => TopicModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    field: 'topic_id',
  })
  topicId!: number

  @ForeignKey(() => CommentModel)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    field: 'parent_id',
  })
  parentId!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'author_id',
  })
  authorId!: number

  @Column({
    type: DataType.STRING(2047),
    allowNull: false,
  })
  text!: string
}

export default CommentModel
