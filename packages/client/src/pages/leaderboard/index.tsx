import { FC } from 'react'
import { ContentLayout } from '../../layouts'
import { Title } from '../../components'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from '@mui/material'
import { TrendingFlat } from '@mui/icons-material'
import { TypographyProps } from '@mui/material'
import { userScores, currentUser } from './mockData'
import { withIcon } from '../../hocs'
import { UserIcon, BombIcon } from '../../icons'
import styles from './styles.module.css'

const WithIconTypography = withIcon<TypographyProps>()(Typography)

const Leaderboard: FC = () => {
  return (
    <ContentLayout
      header={
        <Title mb="17px" mt="17px">
          Add your name to history
        </Title>
      }>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography textAlign="center">Место</Typography>
            </TableCell>
            <TableCell>
              <Typography>Игрок</Typography>
            </TableCell>
            <TableCell>
              <Typography>Счет</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userScores.map((userScore, i) => (
            <TableRow
              key={userScore.user.id}
              sx={{
                position:
                  userScore.user.id === currentUser.id ? 'relative' : 'inherit',
              }}>
              <TableCell>
                <Typography textAlign="center">{i + 1}</Typography>
                {userScore.user.id === currentUser.id && (
                  <Box className={styles.pointer}>
                    <Typography className={styles.pointerText}>
                      you are here
                    </Typography>
                    <TrendingFlat
                      fontSize="large"
                      className={styles.pointerArrow}
                    />
                  </Box>
                )}
              </TableCell>
              <TableCell>
                <WithIconTypography icon={<UserIcon />}>
                  {userScore.user.display_name}
                </WithIconTypography>
              </TableCell>
              <TableCell>
                {i < 3 ? (
                  <WithIconTypography
                    icon={
                      <BombIcon
                        color={i === 1 ? 'silver' : i === 2 ? 'bronze' : 'gold'}
                      />
                    }
                    iconPosition="right">
                    {userScore.score}
                  </WithIconTypography>
                ) : (
                  <Typography>{userScore.score}</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContentLayout>
  )
}

export default Leaderboard
