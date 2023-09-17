import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { TopicModel, CommentModel } from '../../models'

dotenv.config()

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env

const sequelize = new Sequelize({
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_PORT || '5432'),
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: 'testing',
  dialect: 'postgres',
  models: [TopicModel, CommentModel],
})

export default sequelize
