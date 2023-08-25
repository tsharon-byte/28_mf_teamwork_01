import React, { FC } from 'react'
import { SvgIcon } from '@mui/material'
import IIconProps from '../types'

const YandexIcon: FC<IIconProps> = ({ color, size = 24 }) => (
  <SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} color={color}>
    <path d="M12.3949 14.1022L9.27562 21H7L10.4261 13.6237C8.81535 12.8182 7.7415 11.358 7.7415 8.66433C7.7415 4.88812 10.1705 3 13.0597 3H16V21H14.0313V14.1022H12.3949ZM14.0313 4.63637H12.9829C11.3977 4.63637 9.86363 5.66852 9.86363 8.66433C9.86363 11.5594 11.2699 12.4908 12.9829 12.4908H14.0313V4.63637Z" />
  </SvgIcon>
)

export default YandexIcon
