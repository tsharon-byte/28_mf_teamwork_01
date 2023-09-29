import React, { FC } from 'react'
import { Box } from '@mui/material'
import Title from '../../title'
import { NoDiscussionIcon } from '../../../icons'
import styles from './styles.module.css'
import { INoOneDiscussion } from './types'
import { TITLE_VARIANTS, ICON_SIZES } from './constants'

const NoOneDiscussion: FC<INoOneDiscussion> = ({ size = 'middle' }) => (
    <Box className={styles.root}>
      <Title variant={TITLE_VARIANTS[size]}>No one discussion</Title>
      <NoDiscussionIcon size={ICON_SIZES[size]} />
    </Box>
)

export default NoOneDiscussion
