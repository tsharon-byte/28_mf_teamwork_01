import { FC, useCallback } from 'react'
import {
  Typography,
  TypographyProps,
  Box,
  IconButton,
  StyledEngineProvider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

const Title: FC<TypographyProps> = ({
  variant = 'h4',
  align = 'center',
  fontFamily = 'Notable Regular',
  ...props
}) => {
  const navigate = useNavigate()

  const comeBack = useCallback(() => navigate(-1), [])

  return (
    <Box className={styles.root}>
      <StyledEngineProvider injectFirst>
        <IconButton className={styles.comeBackButton} onClick={comeBack}>
          <ArrowBackIcon />
        </IconButton>
      </StyledEngineProvider>
      <Typography
        fontFamily={fontFamily}
        variant={variant}
        align={align}
        {...props}
      />
    </Box>
  )
}

export default Title
