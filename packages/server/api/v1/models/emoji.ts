import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
class Emoji extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name?: string

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  code?: string
}

export default Emoji
