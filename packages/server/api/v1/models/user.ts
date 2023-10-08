import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'users',
  modelName: 'user',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class UserModel extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'yandex_id',
    primaryKey: true,
    unique: true,
  })
  yandexId!: number

  @Column({
    type: DataType.STRING,
  })
  avatar!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  score!: number
}

export default UserModel
