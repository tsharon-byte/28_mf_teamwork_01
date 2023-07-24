import { FC } from 'react'
import { Button } from '@mui/material'
import { TextField, Form } from '../../components'
import {
  loginValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { registrationValidator } from '../../validators'

const Login: FC = () => {
  const handleSubmit = () => {
    console.log('success')
  }

  return (
    <Form validator={registrationValidator} onSubmit={handleSubmit}>
      <TextField
        label="Логин"
        name="login"
        validationRules={[loginValidationRule]}
        required></TextField>
      <TextField
        label="Пароль"
        name="password"
        type="password"
        validationRules={[passwordValidationRule]}
        required></TextField>
      <Button type="submit">Войти</Button>
    </Form>
  )
}

export default Login
