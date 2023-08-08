import React, { memo, FC } from 'react'
import { ProfileInfoType } from './types'
import { SentenceButton } from '../../sentence-button'
import { EditTextField } from '../edit-text-field'

export const ProfileInfo: FC<ProfileInfoType> = memo(props => {
  const { user, handleOpenModal } = props
  return (
    <>
      <EditTextField value={user.login} name="login" label="Логин" />
      <EditTextField value={user.email} name="email" label="Email" />
      <EditTextField value={user.phone} name="phone" label="Телефон" />
      <EditTextField value={user.first_name} name="first_name" label="Имя" />
      <EditTextField
        value={user.second_name}
        name="second_name"
        label="Фамилия"
      />
      <SentenceButton
        callback={handleOpenModal}
        sentence="Надоел пароль?"
        buttonText="Изменить"
      />
    </>
  )
})
