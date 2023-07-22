import { FC } from 'react'
import { menu, ROUTE_PATH } from '../../utils/constants'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { IMenuProps } from './type'
import MenuLogin from '../menu-login'

const Menu: FC<IMenuProps> = ({ isAuthorized }) => {
  const path = location.pathname

  return (
    <nav className={styles.nav}>
      {Object.entries(menu).map(([name, link]) => (
        <Link
          className={path === link ? styles.link__active : styles.link}
          key={link}
          to={link}>
          {name}
        </Link>
      ))}
      <div className={styles.loginWrapper}>
        {isAuthorized ? (
          <MenuLogin />
        ) : (
          <Link to={ROUTE_PATH.LOGIN} className={styles.link__btn}>
            Войти
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Menu
