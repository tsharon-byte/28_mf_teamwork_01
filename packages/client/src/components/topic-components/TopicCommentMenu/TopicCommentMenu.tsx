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

const TopicCommentMenu = () => {
  const { emojies } = useEmoji()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
                <MenuItem
                  onClick={() => {
                    handleClose()
                    console.log('Отправлено на BE: ', item.code)
                  }}>
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
