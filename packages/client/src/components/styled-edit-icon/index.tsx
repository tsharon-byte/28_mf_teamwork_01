import React, { FC, memo } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { StyledEditIconType } from './types'

export const StyledEditIcon: FC<StyledEditIconType> = memo(props => {
  const { mainColor, hoverColor, callback } = props

  return (
    <EditIcon
      onClick={callback}
      onMouseEnter={e => {
        const target = e.currentTarget
        target.style.color = hoverColor
        target.style.cursor = 'pointer'
      }}
      onMouseLeave={e => {
        const target = e.currentTarget
        target.style.color = mainColor
      }}
    />
  )
})
