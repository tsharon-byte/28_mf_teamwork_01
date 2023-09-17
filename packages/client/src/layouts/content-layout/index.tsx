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
  headerClassName,
  mainClassName,
  footerClassName,
  pageClassNames,
  onScroll,
  mode,
  toggleTheme,
}) => (
  <PageLayout
    navigation={navigation}
    {...pageClassNames}
    mode={mode}
    toggleTheme={toggleTheme}>
    {header && (
      <Box className={classNames(styles.header, headerClassName)}>{header}</Box>
    )}
    <Box className={classNames(styles.main, mainClassName)} onScroll={onScroll}>
      {children}
    </Box>
    {footer && (
      <Box className={classNames(styles.footer, footerClassName)}>{footer}</Box>
    )}
  </PageLayout>
)

export default ContentLayout
