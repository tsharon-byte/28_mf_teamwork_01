import { FC } from 'react'
import { Button } from '@mui/material'
import { ContentLayout } from '../../layouts'
import { useAuth } from '../../hooks'

const Profile: FC = () => {
  const { logout } = useAuth()

  return (
    <ContentLayout navigation={false}>
      <Button variant="contained" onClick={logout}>
        Выйти
      </Button>
    </ContentLayout>
  )
}

export default Profile
