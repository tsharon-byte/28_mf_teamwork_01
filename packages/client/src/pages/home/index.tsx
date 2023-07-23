import { FC, useState } from 'react'
import Menu from '../../components/menu'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'

const Home: FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  return (
    <main className={styles.main}>
      <Menu isAuthorized={isAuthorized} />
      <div className={styles.headingBlock}>
        <h1 className={styles.title}>BOMBERMAN</h1>
        <Link
          to={isAuthorized ? ROUTE_PATH.GAME : ROUTE_PATH.REGISTRATION}
          className={styles.startLink}>
          Начать игру
        </Link>
        <Link to="#" className={styles.link}>
          Правила игры
        </Link>
      </div>
    </main>
  )
}

export default Home
