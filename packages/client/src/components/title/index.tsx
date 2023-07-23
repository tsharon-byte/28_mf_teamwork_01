import { FC } from 'react'
import { Typography, TypographyProps } from '@mui/material'
import styles from './styles.module.css'

const Title: FC<TypographyProps> = props => (
  <Typography variant="h1" align="center" className={styles.title} {...props} />
)

export default Title
