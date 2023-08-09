import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Tooltip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import TWithUserHOC, { ExtractFCPropsType } from './types'
import useUser from '../../hooks/use-user'
import isUserDependentProp from './helpers'
import { ROUTE_PATH } from '../../utils/constants'

const withUser: TWithUserHOC =
  () =>
  WrappedComponent =>
  ({ errorComponent = null, defaultComponent = null, ...props }) => {
    const { loading, user, error } = useUser()
    const navigate = useNavigate()

    const wrappedComponentProps = useMemo(
      () =>
        user &&
        Object.fromEntries(
          Object.entries(props).map(([key, val]) => [
            key,
            isUserDependentProp(val) ? val(user) : val,
          ])
        ),
      [user]
    ) as ExtractFCPropsType<typeof WrappedComponent>

    if (loading) {
      return <CircularProgress />
    }

    if (error) {
      error.status === 500 && navigate(ROUTE_PATH.ERROR)
      return (
        errorComponent || (
          <Tooltip title={error.message}>
            <ErrorOutline color="error" />
          </Tooltip>
        )
      )
    }

    return user ? (
      <WrappedComponent {...wrappedComponentProps} />
    ) : (
      defaultComponent
    )
  }

export default withUser
