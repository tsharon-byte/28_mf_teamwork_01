import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { CommentModel, EmojiModel } from './index'

@Table({
  tableName: 'comment_emoji',
})
class CommentEmoji extends Model {
  @ForeignKey(() => CommentModel)
  @Column({
    allowNull: false,
  })
  comment_id?: number

  @ForeignKey(() => EmojiModel)
  @Column({
    allowNull: false,
  })
  emoji_id?: number

  @BelongsTo(() => EmojiModel)
  emoji?: EmojiModel

  @Column
  @Column({
    allowNull: false,
  })
  author_id?: number
}

export default CommentEmoji
