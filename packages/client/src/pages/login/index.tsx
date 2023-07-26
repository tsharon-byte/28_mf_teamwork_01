import { FC, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Form, Button } from '../../components'
import {
  loginValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { loginValidator } from '../../validators'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import styles from './styles.module.css'
import { TLoginData } from '../../api/auth-api/type'
import { login } from '../../api/auth-api'

const Login: FC = () => {
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as TLoginData

    login(data)
      .then(() => navigate(ROUTE_PATH.HOME))
      .catch(error => {
        if (error.response.data.reason === 'User already in system') {
          navigate(ROUTE_PATH.HOME)
        }
      })
  }

  return (
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
  )
}

export default Login
