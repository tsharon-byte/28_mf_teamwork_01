import React, { FC } from 'react'
import { StyledLinkProps } from './types'
import styles from './styles.module.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const StyledLink: FC<StyledLinkProps> = ({ text, to, variant = 'body1' }) => {
  return (
    <Link className={styles.link} to={to}>
      <Typography variant={variant}>{text}</Typography>
    </Link>
  )
}

export default StyledLink
