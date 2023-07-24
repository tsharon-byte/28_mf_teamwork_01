import { FC } from 'react'
import { TextField, Form, Button } from '../../components'
import {
  loginValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { loginValidator } from '../../validators'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import styles from './styles.module.css'

const Login: FC = () => {
  const handleSubmit = () => {
    console.log('success')
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
