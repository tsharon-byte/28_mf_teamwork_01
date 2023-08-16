import React, { memo, FC } from 'react'
import { ForumFooterType } from './types'
import { Button } from '@mui/material'
import styles from './styles.module.css'

export const ForumFooter: FC<ForumFooterType> = memo(
  ({ isOpenModal, handleOpenModal }) => {
    return (
      <footer className={styles.footer}>
        {!isOpenModal && (
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Создать тему
          </Button>
        )}
      </footer>
    )
  }
)
