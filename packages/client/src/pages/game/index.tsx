import React, { FC } from 'react'
import Bomberman from '../../components/bomberman'
import { ContentLayout } from '../../layouts'

const Game: FC = () => {
  return (
    <ContentLayout>
      <Bomberman />
    </ContentLayout>
  )
}
export default Game
