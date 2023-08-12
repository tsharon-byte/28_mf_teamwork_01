import { EndGameLayoutType } from './types'
import React, { memo, FC } from 'react'
import { ContentLayout } from '../../../layouts'
import styles from './styles.module.css'

export const EndGameLayout: FC<EndGameLayoutType> = memo(
  ({ header, footer, children }) => {
    return (
      <ContentLayout
        navigation={false}
        headerClassName={styles.header}
        mainClassName={styles.main}
        footerClassName={styles.footer}
        header={header}
        footer={footer}>
        {children}
      </ContentLayout>
    )
  }
)
