import React, { FC } from 'react'
import { StyledLinkProps } from './type'
import styles from './styles.module.css'
import { Link, Typography } from '@mui/material'

const StyledLink: FC<StyledLinkProps> = ({ text, href, variant = 'body1' }) => {
  return (
    <Link className={styles.link} href={href}>
      <Typography variant={variant}>{text}</Typography>
    </Link>
  )
}

export default StyledLink
