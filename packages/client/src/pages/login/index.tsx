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
import { login } from '../../utils/api'
import { LoginData } from '../../utils/type'

const Login: FC = () => {
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries()) as LoginData

    login(data).then(() => navigate(ROUTE_PATH.HOME))
  }

  return (
    <section className={styles.loginPage}>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <h1 className={styles.heading}>Вход</h1>
          <Form validator={loginValidator} onSubmit={e => handleSubmit(e)}>
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
