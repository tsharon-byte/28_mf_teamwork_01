import React from 'react'
import './ForumImage.css'
import noOneDiscussionsImage from '../../../assets/images/no-one-discussions-image.svg'
import { Box } from '@mui/material'

export const ForumImage = () => {
  return (
    <Box
      component="img"
      className="forum-image"
      src={noOneDiscussionsImage}
      alt="Нет ни одной темы"
    />
  )
}
