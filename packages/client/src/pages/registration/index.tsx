import { FC } from 'react'
import styles from './styles.module.css'
import { TextField, Form, Button } from '../../components'
import {
  emailValidationRule,
  loginValidationRule,
  nameValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { registrationValidator } from '../../validators'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'

const Registration: FC = () => {
  const handleSubmit = () => {
    console.log('success')
  }

  return (
    <section className={styles.registrationPage}>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <h1 className={styles.heading}>Регистрация</h1>
          <Form validator={registrationValidator} onSubmit={handleSubmit}>
            <TextField
              label="Почта"
              name="email"
              type="email"
              validationRules={[emailValidationRule]}
              required
            />
            <TextField
              label="Логин"
              name="login"
              validationRules={[loginValidationRule]}
              required
            />
            <TextField
              label="Имя"
              name="name"
              validationRules={[nameValidationRule]}
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
              <Button type="submit" name="Зарегистрироваться" />
            </div>
          </Form>
          <div className={styles.textBlock}>
            <span className={styles.text}>Уже зарегистрированы?</span>
            <Link to={ROUTE_PATH.LOGIN} className={styles.link}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registration
