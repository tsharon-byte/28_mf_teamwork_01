import { FC, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, TextField } from '../../components'
import {
  loginValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { loginValidator } from '../../validators'
import { ROUTE_PATH } from '../../utils/constants'
import styles from './styles.module.css'
import { TLoginData } from '../../api/auth-api/type'
import { login } from '../../api/auth-api'
import { AxiosError } from 'axios'

const Login: FC = () => {
  const navigate = useNavigate()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as TLoginData

    try {
      const response = await login(data)

      if (response.data === 'OK') {
        navigate(ROUTE_PATH.HOME)
      }
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data.reason === 'User already in system'
      ) {
        navigate(ROUTE_PATH.HOME)
      }
    }
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
              <div className={styles.btn}>
                <Button type="submit" name="Войти" />
              </div>
            </Form>
            <div className={styles.textBlock}>
              <span className={styles.text}>Нет аккаунта?</span>
              <Link to={ROUTE_PATH.REGISTRATION} className={styles.link}>
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  )
}

export default Login
