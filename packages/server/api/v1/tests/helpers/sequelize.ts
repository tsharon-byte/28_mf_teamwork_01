import { Sequelize } from 'sequelize-typescript'
import { TopicModel, CommentModel } from '../../models'

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    TEST_DB
} = process.env

const sequelize = new Sequelize({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: TEST_DB,
    dialect: 'postgres',
    models: [TopicModel, CommentModel]
})

export default sequelize
