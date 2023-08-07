import { FC } from 'react'
import { ContentLayout } from '../../layouts'
import { EndGameLink } from '../../components/end-game-components/end-game-link'
import { EndGameTitle } from '../../components/end-game-components/end-game-title'
import { StyledLink } from '../../components'

const EndGame: FC = () => {
  return (
    <>
      <ContentLayout navigation={false}>
        <EndGameTitle text="Игра завершена" />
        <EndGameLink>
          <StyledLink text="Повторить" to="/game" />
          <StyledLink text="Вернуться на главную страницу" to="/" />
        </EndGameLink>
      </ContentLayout>
    </>
  )
}

export default EndGame
