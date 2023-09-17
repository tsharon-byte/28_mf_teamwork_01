import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { TopicModel, CommentModel } from './api/v1/models'
import { emojiModel } from './models/Emoji'
import { themeModel } from './models/theme'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env

const sequelize = new Sequelize({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [TopicModel, CommentModel],
})

export const Emoji = sequelize.define('Emoji', emojiModel, {})

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

export const Theme = sequelize.define('Theme', themeModel, {})

const connect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    await Theme.sync()
    await Theme.create({
      mode: 'dark',
    })
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

export default connect
