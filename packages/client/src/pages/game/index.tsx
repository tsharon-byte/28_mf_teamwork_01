import React, { FC } from 'react'
import Bomberman from '../../components/bomberman'
import { Box } from '@mui/material'
import './Game.css'
import { useLeaderboard } from '../../hooks'
import { saveScore } from '../../api/auth-api'

const Game: FC = () => {
  const { createLeaderboardRecord } = useLeaderboard(false)

  const handleSuccess = (score: number) => {
    saveScore(score)
    createLeaderboardRecord(score)
  }

  return (
    <Box className="game">
      <Bomberman onSuccess={handleSuccess} />
    </Box>
  )
}
export default Game
