import React, { memo, FC } from 'react'
import { ProfileInfoType } from './types'
import { SentenceButton } from '../../sentence-button'
import { EditTextField } from '../edit-text-field'

export const ProfileInfo: FC<ProfileInfoType> = memo(props => {
  const { user, handleOpenModal } = props
  return (
    <>
      <EditTextField value={user.login} />
      <EditTextField value={user.email} />
      <EditTextField value={user.phone} />
      <EditTextField value={user.first_name} />
      <EditTextField value={user.second_name} />
      <SentenceButton
        callback={handleOpenModal}
        sentence="Надоел пароль?"
        buttonText="Изменить"
      />
    </>
  )
})
