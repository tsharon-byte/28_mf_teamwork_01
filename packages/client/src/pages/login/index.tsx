import { FC } from 'react'
import { Button } from '@mui/material'
import { TextField, Form } from '../../components'
import {
  loginValidationRule,
  passwordValidationRule,
} from '../../validation-rules'
import { registrationValidator } from '../../validators'
import { ContentLayout } from '../../layouts'

const Login: FC = () => {
  const handleSubmit = () => {
    console.log('success')
  }

  return (
    <ContentLayout navigation={false}>
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
    </ContentLayout>
  )
}

export default Login
