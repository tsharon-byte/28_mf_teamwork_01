import React, { FC } from 'react'
import { SvgIcon } from '@mui/material'
import IIconProps from '../types'

const BombIcon: FC<IIconProps> = ({ color = 'inherit', size = 24 }) => (
  <SvgIcon sx={{ width: `${size}px`, height: `${size}px` }} color={color}>
    <path d="M19.207 5.45771L17.1758 7.48935L18.2109 8.52472C18.5781 8.89198 18.5781 9.48584 18.2109 9.8492L17.5313 10.529C17.9922 11.5487 18.25 12.6818 18.25 13.8734C18.25 18.3626 14.6133 22 10.125 22C5.63672 22 2 18.3665 2 13.8773C2 9.38817 5.63672 5.75073 10.125 5.75073C11.3164 5.75073 12.4492 6.0086 13.4687 6.46962L14.1484 5.78981C14.5156 5.42255 15.1094 5.42255 15.4727 5.78981L16.5078 6.82516L18.5391 4.79351L19.207 5.45771ZM21.5312 4.34421H20.5937C20.3359 4.34421 20.125 4.5552 20.125 4.81305C20.125 5.07092 20.3359 5.28189 20.5937 5.28189H21.5312C21.7891 5.28189 22 5.07092 22 4.81305C22 4.5552 21.7891 4.34421 21.5312 4.34421ZM19.1875 2C18.9297 2 18.7187 2.21099 18.7187 2.46884V3.40652C18.7187 3.66439 18.9297 3.87537 19.1875 3.87537C19.4453 3.87537 19.6562 3.66439 19.6562 3.40652V2.46884C19.6562 2.21099 19.4453 2 19.1875 2ZM20.5117 4.14887L21.1758 3.48467C21.3594 3.30104 21.3594 3.00411 21.1758 2.82048C20.9922 2.63684 20.6953 2.63684 20.5117 2.82048L19.8477 3.48467C19.6641 3.66829 19.6641 3.96523 19.8477 4.14887C20.0352 4.33249 20.332 4.33249 20.5117 4.14887ZM17.8633 4.14887C18.0469 4.33249 18.3437 4.33249 18.5273 4.14887C18.7109 3.96523 18.7109 3.66829 18.5273 3.48467L17.8633 2.82048C17.6797 2.63684 17.3828 2.63684 17.1992 2.82048C17.0156 3.00411 17.0156 3.30104 17.1992 3.48467L17.8633 4.14887ZM20.5117 5.47724C20.3281 5.29361 20.0313 5.29361 19.8477 5.47724C19.6641 5.66088 19.6641 5.9578 19.8477 6.14144L20.5117 6.80564C20.6953 6.98926 20.9922 6.98926 21.1758 6.80564C21.3594 6.622 21.3594 6.32506 21.1758 6.14144L20.5117 5.47724ZM6.375 12.6271C6.375 11.2479 7.49609 10.1266 8.875 10.1266C9.21875 10.1266 9.5 9.84528 9.5 9.50146C9.5 9.15765 9.21875 8.87634 8.875 8.87634C6.80859 8.87634 5.125 10.5603 5.125 12.6271C5.125 12.9709 5.40625 13.2522 5.75 13.2522C6.09375 13.2522 6.375 12.9709 6.375 12.6271Z" />
  </SvgIcon>
)

export default BombIcon