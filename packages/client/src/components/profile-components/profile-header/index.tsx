import React, { memo } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ProfileHeaderType } from './types'
import styles from './styles.module.css'

export const ProfileHeader = memo((props: ProfileHeaderType) => {
  const { callback } = props
  return (
    <header className={styles.header}>
      <ArrowBackIcon onClick={callback} className={styles.arrow} />
    </header>
  )
})
