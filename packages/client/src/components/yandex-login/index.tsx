import React, { FC, useEffect, useMemo } from 'react'
import { IconButton } from '@mui/material'
import { YandexIcon } from '../../icons'
import styles from './styles.module.css'
import { AUTHORIZE_URL } from './constants'
import { useOAuth } from '../../hooks'

const YandexLogin: FC = () => {
  const { clientId, retrieveClientId } = useOAuth()

  useEffect(() => {
    retrieveClientId()
  }, [])

  const url = useMemo(
    () => (clientId ? AUTHORIZE_URL.replace('{client_id}', clientId) : ''),
    [clientId]
  )

  return (
    <IconButton className={styles.iconButton} href={url}>
      <YandexIcon color="inherit" />
    </IconButton>
  )
}

export default YandexLogin
