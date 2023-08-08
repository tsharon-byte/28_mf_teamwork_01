import { cloneElement, isValidElement, useMemo } from 'react'
import { CircularProgress, Tooltip } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import TWithUserHOC, { ExtractFCPropsType } from './types'
import useUser from '../../hooks/use-user'
import isUserDependentProp from './helpers'

const withUser: TWithUserHOC =
  () =>
  WrappedComponent =>
  ({ errorComponent = null, defaultComponent = null, ...props }) => {
    const { loading, user, error } = useUser()

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
      return isValidElement(errorComponent) ? (
        cloneElement(errorComponent, { error })
      ) : (
        <Tooltip title={error}>
          <ErrorOutline color="error" />
        </Tooltip>
      )
    }

    return user ? (
      <WrappedComponent {...wrappedComponentProps} />
    ) : (
      defaultComponent
    )
  }

export default withUser
