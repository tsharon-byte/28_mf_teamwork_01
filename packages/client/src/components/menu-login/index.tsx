import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import accountImg from '../../assets/images/account.svg'
import styles from './styles.module.css'

const MenuLogin: FC = () => {
  const [name, setName] = useState('Accew12')

  return (
    <Link to={ROUTE_PATH.PROFILE} className={styles.link}>
      <img src={accountImg} alt="" />
      <span className={styles.name}>{name}</span>
    </Link>
  )
}

export default MenuLogin
