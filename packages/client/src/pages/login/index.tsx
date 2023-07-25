import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { TextField, Form } from '../../components'
import {
  loginValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { registrationValidator } from '../../validators'
import { ContentLayout } from '../../layouts'
import { ROUTE_PATH } from '../../utils/constants'
import styles from './styles.module.css'

const Login: FC = () => {
  const handleSubmit = () => {
    console.log('success')
  }

  return (
    <ContentLayout navigation={false} mainClassName={styles.main}>
      <h1 className={styles.heading}>Вход</h1>
      <Form validator={registrationValidator} onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          name="login"
          validationRules={[loginValidationRule]}
          required
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          validationRules={[passwordValidationRule]}
          required
        />
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </Form>
      <div className={styles.textBlock}>
        <span className={styles.text}>Нет аккаунта?</span>
        <Link to={ROUTE_PATH.REGISTRATION} className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>
    </ContentLayout>
  )
}

export default Login
