import React, { memo, FC } from 'react'
import { Close as MuiCloseIcon } from '@mui/icons-material/'
import styles from './styles.module.css'
import { CloseIconType } from './types'

export const CloseIcon: FC<CloseIconType> = memo(({ callback }) => {
  return <MuiCloseIcon onClick={callback} className={styles.close} />
})
