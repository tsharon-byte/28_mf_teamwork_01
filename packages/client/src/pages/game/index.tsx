import React, { FC } from 'react'
import Bomberman from '../../components/bomberman'
import './game.css'

const Game: FC = () => {
  return (
    <div className="game">
      <Bomberman />
    </div>
  )
}
export default Game
