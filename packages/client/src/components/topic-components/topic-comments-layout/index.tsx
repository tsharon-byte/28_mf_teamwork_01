import React, { memo, FC } from 'react'
import { TopicCommentsLayoutType } from './types'
import styles from './styles.module.css'
import { ContentLayout } from '../../../layouts'
import { Paper, Typography } from '@mui/material'

export const TopicCommentstLayout: FC<TopicCommentsLayoutType> = memo(
  ({ comments, header, footer }) => {
    return (
      <ContentLayout
        mainClassName={styles.main}
        headerClassName={styles.header}
        footerClassName={styles.footer}
        header={header}
        footer={footer}>
        {comments &&
          comments.map(comment => {
            const { id, text } = comment
            return (
              <Paper key={id} className={styles.comment}>
                <Typography variant="body1" className={styles.text}>
                  {text}
                </Typography>
              </Paper>
            )
          })}
      </ContentLayout>
    )
  }
)
