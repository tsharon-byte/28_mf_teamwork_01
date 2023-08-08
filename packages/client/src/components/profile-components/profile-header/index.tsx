import React, { memo } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ProfileHeaderType } from './types'
import styles from './styles.module.css'

export const ProfileHeader = memo((props: ProfileHeaderType) => {
  const { callback } = props
  return (
    <header className={styles.profile__header}>
      <ArrowBackIcon
        onClick={callback}
        sx={{
          ':hover': { cursor: 'pointer' },
          opacity: 0.5,
          width: 30,
          height: 30,
        }}
      />
    </header>
  )
})
