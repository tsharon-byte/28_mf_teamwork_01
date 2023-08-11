import React, { FC } from 'react'
import { EndGameTitleType } from './types'
import { Typography } from '@mui/material'

export const EndGameTitle: FC<EndGameTitleType> = ({ text }) => {
  return <Typography variant="h1">{text}</Typography>
}
