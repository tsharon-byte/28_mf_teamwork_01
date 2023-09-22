import express from 'express'
import { getTheme, changeTheme } from '../controllers/theme'

const themeRoute = express.Router()
themeRoute.get('/:userId', getTheme)
themeRoute.post('/', changeTheme)
export default themeRoute
