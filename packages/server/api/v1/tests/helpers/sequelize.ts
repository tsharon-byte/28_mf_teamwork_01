import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { TopicModel, CommentModel } from '../../models'

dotenv.config()

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env

const sequelize = new Sequelize({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: 'testing',
  dialect: 'postgres',
  models: [TopicModel, CommentModel],
})

export default sequelize
