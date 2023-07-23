import React, { FC } from 'react'
import { Box } from '@mui/material'
import styles from './styles.module.css'
import IContentLayoutProps from './types'
import PageLayout from '../page-layout'

const ContentLayout: FC<IContentLayoutProps> = ({
  header,
  children,
  footer,
}) => (
  <PageLayout>
    {header && <Box className={styles.header}>{header}</Box>}
    <Box className={styles.main}>{children}</Box>
    {footer && <Box className={styles.footer}>{footer}</Box>}
  </PageLayout>
)

export default ContentLayout
