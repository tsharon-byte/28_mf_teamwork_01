import React, { memo, forwardRef, FC, useState } from 'react'
import { ProfileAvatarType } from './types'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import styles from './styles.module.css'
import { makeResourcePath } from '../../../helpers'
import { Avatar } from '@mui/material'

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
        {isHoverAvatar && (
          <>
            <FileUploadIcon
              onClick={handleUploadFile}
              className={styles.icon}
            />
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              ref={ref}
              onChange={handleChangeAvatar}
            />
          </>
        )}
        <Avatar
          className={styles.avatar}
          sizes="md"
          alt={user.first_name}
          src={user.avatar && makeResourcePath(user.avatar)}></Avatar>
        {isHoverAvatar && <DeleteOutlineIcon className={styles.icon} />}
      </div>
    )
  })
)
