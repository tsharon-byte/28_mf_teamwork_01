import { DataType, Model, Table, Column } from 'sequelize-typescript'

@Table({
    tableName: 'topics',
    modelName: 'topic'
})
class TopicModel extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'author_id'
    })
    authorId!: number

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
    })
    name!: string

    @Column({
        type: DataType.STRING(2047)
    })
    description!: string

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataType.NOW
    })
    override createdAt!: Date

    @Column({
        type: DataType.DATE,
        field: 'updated_at'
    })
    override updatedAt!: Date
};

export default TopicModel
