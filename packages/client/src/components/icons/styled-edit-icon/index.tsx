import React, { FC, memo } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { StyledEditIconType } from './types'
import styles from './styles.module.css'

export const StyledEditIcon: FC<StyledEditIconType> = memo(props => {
  const { mainColor, hoverColor, callback } = props

  return (
    <EditIcon
      className={styles.icon}
      onClick={callback}
      onMouseEnter={e => {
        const target = e.currentTarget
        target.style.color = hoverColor
      }}
      onMouseLeave={e => {
        const target = e.currentTarget
        target.style.color = mainColor
      }}
    />
  )
})
