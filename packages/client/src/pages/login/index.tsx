import { FC, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { Form, TextField } from '../../components'
import {
  loginValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { loginValidator } from '../../validators'
import { ROUTE_PATH } from '../../utils/constants'
import styles from './styles.module.css'
import { TLoginData } from '../../api/auth-api/type'
import { ContentLayout } from '../../layouts'
import { useAuth } from '../../hooks'
import { YandexLogin } from '../../components'

const Login: FC = () => {
  const { login } = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as TLoginData
    login(data)
  }

  return (
    <ContentLayout navigation={false}>
      <section className={styles.loginPage}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <h1 className={styles.heading}>Вход</h1>
            <Form validator={loginValidator} onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                className={styles.button}
                variant="contained">
                Войти
              </Button>
            </Form>
            <YandexLogin />
            <div className={styles.textBlock}>
              <span>Нет аккаунта?</span>
              <Link to={ROUTE_PATH.REGISTRATION}>Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  )
}

export default Login
