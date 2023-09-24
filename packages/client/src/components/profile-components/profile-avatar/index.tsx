import React, { memo, forwardRef, FC, useState } from 'react'
import { ProfileAvatarType } from './types'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import styles from './styles.module.css'
import { makeResourcePath } from '../../../helpers'
import { Avatar, IconButton, Backdrop } from '@mui/material'

export const ProfileAvatar: FC<ProfileAvatarType> = memo(
  forwardRef((props, ref) => {
    const { handleUploadFile, handleChangeAvatar, user } = props
    const [isHoverAvatar, setIsHoverAvatar] = useState(false)
    const handleMouseEnterAvatar = () => setIsHoverAvatar(true)
    const handleMouseLeaveAvatar = () => setIsHoverAvatar(false)
    return (
      <div
        onMouseEnter={handleMouseEnterAvatar}
        onMouseLeave={handleMouseLeaveAvatar}
        className={styles.profile__avatar}>
        <Avatar
          className={styles.avatar}
          sizes="md"
          alt={user.first_name}
          src={user.avatar && makeResourcePath(user.avatar)}></Avatar>
        <Backdrop open={isHoverAvatar} className={styles.backdrop}>
          <IconButton onClick={handleUploadFile}>
            <FileUploadIcon className={styles.icon} />
          </IconButton>
          <input
            className={styles.input}
            type="file"
            accept="image/*"
            ref={ref}
            onChange={handleChangeAvatar}
          />
        </Backdrop>
      </div>
    )
  })
)
