import express from 'express'
import { getTheme } from '../controllers/theme-controllers'

const themeRoute = express.Router()
themeRoute.get('/', getTheme)
export default themeRoute
