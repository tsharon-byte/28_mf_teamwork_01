import { FC, FormEvent } from 'react'
import styles from './styles.module.css'
import { TextField, Form } from '../../components'
import { Button, Link as MuiLink } from '@mui/material'
import {
  emailValidationRule,
  loginValidationRule,
  nameValidationRule,
  passwordValidationRule,
  phoneValidationRule,
} from '../../validation-rules'
import { registrationValidator } from '../../validators'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import { TRegistrationData } from '../../api/auth-api/type'

import { ContentLayout } from '../../layouts'
import { useAuth } from '../../hooks'

const Registration: FC = () => {
  const { registration } = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as TRegistrationData
    registration(data)
  }

  return (
    <ContentLayout navigation={false}>
      <div className={styles.form}>
        <h1 className={styles.heading}>Регистрация</h1>
        <Form validator={registrationValidator} onSubmit={handleSubmit}>
          <TextField
            label="Имя"
            name="first_name"
            validationRules={[nameValidationRule]}
            required
          />
          <TextField
            label="Фамилия"
            name="second_name"
            validationRules={[nameValidationRule]}
            required
          />
          <TextField
            label="Логин"
            name="login"
            validationRules={[loginValidationRule]}
            required
          />
          <TextField
            label="Почта"
            name="email"
            type="email"
            validationRules={[emailValidationRule]}
            required
          />
          <TextField
            label="Телефон"
            name="phone"
            type="tel"
            validationRules={[phoneValidationRule]}
            required
          />
          <TextField
            label="Пароль"
            name="password"
            type="password"
            validationRules={[passwordValidationRule]}
            required
          />
          <Button type="submit" className={styles.button} variant="contained">
            Зарегистрироваться
          </Button>
        </Form>
        <div className={styles.textBlock}>
          <span>Уже зарегистрированы?</span>

          <Link to={ROUTE_PATH.LOGIN} className={styles.link}>
            <MuiLink underline="always" variant="inherit">
              Войти
            </MuiLink>
          </Link>
        </div>
      </div>
    </ContentLayout>
  )
}

export default Registration
