import React, { FC } from 'react'
import { SvgIcon } from '@mui/material'
import IIconProps from '../types'

const UserIcon: FC<IIconProps> = ({ color, size = 24 }) => (
  <SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} color={color}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5 7C14.5 8.38071 13.3807 9.5 12 9.5C10.6193 9.5 9.5 8.38071 9.5 7C9.5 5.61929 10.6193 4.5 12 4.5C13.3807 4.5 14.5 5.61929 14.5 7ZM16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM5.5 20.9412C5.5 20.9608 5.5001 20.9804 5.5003 21H4.00024L4 20.9412C4 16.5554 7.61421 13 12 13C16.3858 13 20 16.5554 20 20.9412L19.9998 21H18.4997C18.4999 20.9804 18.5 20.9608 18.5 20.9412C18.5 17.3982 15.5718 14.5 12 14.5C8.4282 14.5 5.5 17.3982 5.5 20.9412Z"
    />
  </SvgIcon>
)

export default UserIcon
