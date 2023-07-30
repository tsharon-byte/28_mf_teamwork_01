import { FC, FormEvent } from 'react'
import styles from './styles.module.css'
import { TextField, Form, Button } from '../../components'
import {
  emailValidationRule,
  loginValidationRule,
  nameValidationRule,
  passwordValidationRule,
  phoneValidationRule,
} from '../../validation-rules'
import { registrationValidator } from '../../validators'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import { TRegistrationData } from '../../api/auth-api/type'
import { registration } from '../../api/auth-api'
import { AxiosError } from 'axios'
import { ContentLayout } from '../../layouts'

const Registration: FC = () => {
  const navigate = useNavigate()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as TRegistrationData

    try {
      const response = await registration(data)

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
    </ContentLayout>
  )
}

export default Registration
