import { FC } from 'react'
import { EndGameTitle } from '../../components/end-game-components/end-game-title'
import { StyledLink } from '../../components'
import explosionImg from '../../assets/images/explosion.svg'
import styled from '@emotion/styled'
import { EndGameLayout } from '../../components/end-game-components/end-game-layout'

const Image = styled('img')({})

const EndGame: FC = () => {
  return (
    <EndGameLayout
      header={<Image src={explosionImg} alt="Взрыв" />}
      footer={
        <>
          <StyledLink text="Вернуться на главную страницу" to="/" />
          <StyledLink text="Повторить" to="/game" />
        </>
      }>
      <EndGameTitle text="GAME OVER" />
    </EndGameLayout>
  )
}

export default EndGame
