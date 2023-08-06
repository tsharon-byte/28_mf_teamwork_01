import React, { memo, forwardRef, FC } from 'react'
import { ProfileAvatarType } from './types'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import styles from './styles.module.css'
import { makeResourcePath } from '../../helpers'
import { Avatar } from '@mui/material'

export const ProfileAvatar: FC<ProfileAvatarType> = memo(
  forwardRef((props, ref) => {
    const {
      handleMouseEnterAvatar,
      handleMouseLeaveAvatar,
      isHoverAvatar,
      handleUploadFile,
      handleChangeAvatar,
      user,
    } = props
    return (
      <div
        onMouseEnter={handleMouseEnterAvatar}
        onMouseLeave={handleMouseLeaveAvatar}
        className={styles.profile__avatar}>
        {isHoverAvatar && (
          <>
            <FileUploadIcon
              onClick={handleUploadFile}
              sx={{
                cursor: 'pointer',
                ':hover': { color: '#FCD448' },
              }}
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
          sx={{
            width: 150,
            height: 150,
            bgcolor: '#FFFFFF',
            ':hover': { bgcolor: '#FCD448' },
          }}
          sizes="md"
          alt={user.first_name}
          src={user.avatar && makeResourcePath(user.avatar)}></Avatar>
        {isHoverAvatar && (
          <DeleteOutlineIcon
            sx={{
              cursor: 'pointer',
              ':hover': { color: '#FCD448' },
            }}
          />
        )}
      </div>
    )
  })
)
