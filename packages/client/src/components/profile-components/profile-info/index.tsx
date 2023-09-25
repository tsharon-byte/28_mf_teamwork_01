import React, { memo, FC } from 'react'
import { ProfileInfoType } from './types'
import { SentenceButton } from '../../sentence-button'
import { EditTextField } from '../edit-text-field'
import Form from '../../form'
import {
  emailValidationRule,
  loginValidationRule,
  nameValidationRule,
  phoneValidationRule,
} from '../../../validation-rules'
import { updateUserValidator } from '../../../validators'
import styles from './styles.module.css'

export const ProfileInfo: FC<ProfileInfoType> = memo(props => {
  const { user, handleOpenModal, theme, handleUpdateUserSubmit } = props
  const mainColor = theme === 'light' ? '#000000' : '#FFFFFF'
  const hoverColor = theme === 'light' ? '#a26565' : '#FFD54F'
  return (
    <Form
      validator={updateUserValidator}
      onSubmit={handleUpdateUserSubmit}
      className={styles.form}>
      <EditTextField
        mainColor={mainColor}
        hoverColor={hoverColor}
        value={user.login}
        name="login"
        label="Логин"
        validationRules={[loginValidationRule]}
      />
      <EditTextField
        mainColor={mainColor}
        hoverColor={hoverColor}
        value={user.email}
        name="email"
        label="Email"
        validationRules={[emailValidationRule]}
      />
      <EditTextField
        mainColor={mainColor}
        hoverColor={hoverColor}
        value={user.phone || ''}
        name="phone"
        label="Телефон"
        validationRules={[phoneValidationRule]}
      />
      <EditTextField
        mainColor={mainColor}
        hoverColor={hoverColor}
        value={user.first_name}
        name="first_name"
        label="Имя"
        validationRules={[nameValidationRule]}
      />
      <EditTextField
        mainColor={mainColor}
        hoverColor={hoverColor}
        value={user.second_name}
        name="second_name"
        label="Фамилия"
        validationRules={[nameValidationRule]}
      />
      <SentenceButton
        callback={handleOpenModal}
        sentence="Надоел пароль?"
        buttonText="Изменить"
      />
    </Form>
  )
})
