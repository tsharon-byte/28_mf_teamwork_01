import { FC } from 'react'
import { Typography, TypographyProps } from '@mui/material'
import styles from './styles.module.css'

const Title: FC<TypographyProps> = ({ variant = 'h4', ...props }) => (
  <Typography
    variant={variant}
    align="center"
    className={styles.title}
    {...props}
  />
)

export default Title
