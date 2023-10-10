import React, { FC } from 'react'
import Bomberman from '../../components/bomberman'
import { Box } from '@mui/material'
import './Game.css'
import { useLeaderboard } from '../../hooks'

const Game: FC = () => {
  const { createLeaderboardRecord } = useLeaderboard(false)

  const handleSuccess = (score: number) => {
    createLeaderboardRecord(score)
  }

  return (
    <Box className="game">
      <Bomberman onSuccess={handleSuccess} />
    </Box>
  )
}
export default Game
