import React from 'react'
import './ForumImage.css'
import noOneDiscussionsImage from '../../../assets/images/no-one-discussions-image.svg'
import noOneDiscussionsImageDark from '../../../assets/images/no-one-discussions-image-dark.svg'
import { Box } from '@mui/material'
import { ForumImageType } from './types'

export const ForumImage = ({ theme }: ForumImageType) => {
  return (
    <Box
      component="img"
      className="forum-image"
      src={theme === 'dark' ? noOneDiscussionsImage : noOneDiscussionsImageDark}
      alt="Нет ни одной темы"
    />
  )
}
