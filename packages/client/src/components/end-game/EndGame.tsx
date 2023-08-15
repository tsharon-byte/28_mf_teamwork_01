import React from 'react'
import explosionImg from '../../assets/images/explosion.svg'
import { Box, Typography } from '@mui/material'
import './EndGame.css'

const EndGame = ({ isSuccess }: { isSuccess: boolean }) => {
  return (
    <Box className="end-game">
      <img src={explosionImg} alt="Взрыв" />
      <Typography>{isSuccess ? 'Победа' : 'Вы проиграли'}</Typography>
    </Box>
  )
}
export default EndGame
