import React, { FC } from 'react'
import classNames from 'classnames'
import { Box } from '@mui/material'
import styles from './styles.module.css'
import IContentLayoutProps from './types'
import PageLayout from '../page-layout'

const ContentLayout: FC<IContentLayoutProps> = ({
  header,
  children,
  footer,
  navigation = true,
  className,
}) => (
  <PageLayout navigation={navigation}>
    {header && <Box className={styles.header}>{header}</Box>}
    <Box className={classNames(styles.main, className)}>{children}</Box>
    {footer && <Box className={styles.footer}>{footer}</Box>}
  </PageLayout>
)

export default ContentLayout
