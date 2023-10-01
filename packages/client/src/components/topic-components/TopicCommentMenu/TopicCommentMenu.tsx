import React from 'react'
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from '@mui/material'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import styles from './styles.module.css'
import { useEmoji } from '../../../hooks'
import { useAppSelector } from '../../../store/hooks'
import { EmojiType } from '../../../store/slices/emoji-slice/types'
import { addEmoji } from '../../../api/emoji-api'
import { userSelector } from '../../../store/slices/user-slice/selectors'

const TopicCommentMenu = ({
  id,
  shouldUpdate,
  setShouldUpdate,
}: {
  id: number
  shouldUpdate: boolean
  setShouldUpdate: (arg0: boolean) => void
}) => {
  const { emojies } = useEmoji()
  const { user } = useAppSelector(userSelector)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSelectEmoji = async (item: EmojiType) => {
    handleClose()
    console.log('Отправлено на BE: ', item.code)
    try {
      const data = {
        emoji_id: item.id,
        author_id: user!.id,
      }
      await addEmoji(id, data)
      setShouldUpdate(!shouldUpdate)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AppBar className={styles.emoji}>
      <Toolbar>
        <div>
          <Tooltip title="Добавить реакцию" placement="top" arrow>
            <IconButton aria-label="add emoji" onClick={handleClick}>
              <AddReactionIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="emoji-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              sx: { display: 'flex', maxWidth: '300px', flexWrap: 'wrap' },
            }}>
            {emojies.map(item => (
              <Tooltip title={item.name} key={item.code}>
                <MenuItem onClick={() => handleSelectEmoji(item)}>
                  {item.code}
                </MenuItem>
              </Tooltip>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default TopicCommentMenu
