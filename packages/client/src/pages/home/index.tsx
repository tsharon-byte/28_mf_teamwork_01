import { FC } from 'react'
import { Button } from '@mui/material'
import { TextField, Form } from '../../components'
import {
  nameValidationRule,
  emailValidationRule,
  passwordValidationRule,
  phoneValidationRule,
} from '../../validation-rules'
import { registrationValidator } from '../../validators'

const Home: FC = () => {
  const handleSubmit = () => {
    console.log('success')
  }

  // Пример формы с валидацией
  return (
    <Form validator={registrationValidator} onSubmit={handleSubmit}>
      <TextField
        label="first_name"
        name="first_name"
        validationRules={[nameValidationRule]}></TextField>
      <TextField
        label="email"
        name="email"
        type="email"
        validationRules={[emailValidationRule]}></TextField>
      <TextField
        label="password"
        name="password"
        type="password"
        validationRules={[passwordValidationRule]}></TextField>
      <TextField
        label="phone"
        name="phone"
        validationRules={[phoneValidationRule]}></TextField>
      <Button type="submit">Отправить</Button>
    </Form>
  )
}

export default Home
