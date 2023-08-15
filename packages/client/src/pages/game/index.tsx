import React, { FC } from 'react'
import Bomberman from '../../components/bomberman'
import { Box } from '@mui/material'
import './Game.css'

const Game: FC = () => {
  return (
    <Box className="game">
      <Bomberman />
    </Box>
  )
}
export default Game
