import React, { CSSProperties, FC, memo } from 'react'
import { GAME_DURATION } from '../../../utils/constants'
import { TProgressBar } from './types'
import styles from './styles.module.css'
import { useAppSelector } from '../../../store/hooks'
import UserSelector from '../../../store/slices/user-slice/selectors/user-selector'

const animDurationCss = {
  animationDuration: `${GAME_DURATION}s`,
} as CSSProperties

const ProgressBar: FC<TProgressBar> = ({ isStartGame }) => {
  const { score } = useAppSelector(UserSelector)
  return (
    <div className={styles.panel}>
      <div className={styles.progressBar}>
        <div className={styles.bar}>
          <div
            className={isStartGame ? styles.progressStart : styles.progressStop}
            style={animDurationCss}></div>
        </div>
      </div>
      <div>Счет: {score}</div>
    </div>
  )
}

export default memo(ProgressBar)