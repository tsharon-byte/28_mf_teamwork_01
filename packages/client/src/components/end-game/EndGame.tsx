import React, { FC } from 'react'
import explosionImg from '../../assets/images/explosion.svg'
import { Box, Typography } from '@mui/material'
import './EndGame.css'

const EndGame: FC<EndGamePropsType> = ({ isSuccess }) => (
  <Box className="end-game">
    <Box component="img" src={explosionImg} alt="Взрыв" />
    <Typography>{isSuccess ? 'Победа' : 'Вы проиграли'}</Typography>
  </Box>
)
export default EndGame
