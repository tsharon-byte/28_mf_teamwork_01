import { FC, useCallback } from 'react'
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
  CircularProgress,
} from '@mui/material'
import { TrendingFlat } from '@mui/icons-material'
import { TypographyProps } from '@mui/material'
import { withIcon } from '../../hocs'
import { UserIcon, BombIcon, PodiumIcon } from '../../icons'
import styles from './styles.module.css'
import useLeaderboard from '../../hooks/use-leaderboard'
import { useUser } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { userSelector } from '../../store/slices/user-slice/selectors'
import { userSlice } from '../../store/slices'

const WithIconTypography = withIcon<TypographyProps>()(Typography)

const Leaderboard: FC = () => {
  const dispatch = useAppDispatch()
  const { loading, leaderboard, infiniteScroll } = useLeaderboard()
  const { user } = useUser()
  const { mode } = useAppSelector(userSelector)
  const toggleThemeCallback = useCallback(() => {
    dispatch(userSlice.actions.toggleTheme())
  }, [])
  return (
    <ContentLayout
      mode={mode}
      toggleTheme={toggleThemeCallback}
      header={
        loading || leaderboard.length ? (
          <Title mb="17px" mt="17px">
            Add your name to history
          </Title>
        ) : null
      }
      onScroll={infiniteScroll}>
      {!leaderboard.length && loading ? (
        <CircularProgress />
      ) : leaderboard.length ? (
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
            {leaderboard.map((record, i) => (
              <TableRow
                key={record.user.id}
                sx={{
                  position:
                    record.user.id === user?.id ? 'relative' : 'inherit',
                }}>
                <TableCell>
                  <Typography textAlign="center">{i + 1}</Typography>
                  {record.user.id === user?.id && (
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
                    {record.user.display_name || record.user.login}
                  </WithIconTypography>
                </TableCell>
                <TableCell>
                  {i < 3 ? (
                    <WithIconTypography
                      icon={
                        <BombIcon
                          color={
                            i === 1 ? 'silver' : i === 2 ? 'bronze' : 'gold'
                          }
                        />
                      }
                      iconPosition="right">
                      {record.score}
                    </WithIconTypography>
                  ) : (
                    <Typography>{record.score}</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <>
          <Title mb="17px" mt="17px">
            no one result
          </Title>
          <PodiumIcon size={400} />
        </>
      )}
    </ContentLayout>
  )
}

export default Leaderboard
