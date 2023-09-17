import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { userModel } from './models/user'
import { emojiModel } from './models/Emoji'

dotenv.config()

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const smileCodes = [
  { name: 'Thumbs Up', code: '👍' },
  { name: 'Grinning Face', code: '😀' },
  { name: 'Face Blowing a Kiss', code: '😘' },
  { name: 'Smiling Face with Heart-Eyes', code: '😍' },
  { name: 'Grinning Squinting Face', code: '😆' },
  { name: 'Winking Face with Tongue', code: '😜' },
  { name: 'Grinning Face with Sweat', code: '😅' },
  { name: 'Check Mark Button', code: '✅' },
  { name: 'Bomb', code: '💣' },
]

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT || 5432),
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

//Проверка синхронизации с БД, создание таблицы с пользователем
export const User = sequelize.define('User', userModel, {})

//Проверка синхронизации с БД, создание таблицы с эмоджи
export const Emoji = sequelize.define('Emoji', emojiModel, {})

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await User.sync()
    Emoji.sync({ force: true }).then(() => {
      smileCodes.forEach((item: { name: string; code: string }) => {
        Emoji.create({
          name: item.name,
          code: item.code,
        })
      })
    })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
