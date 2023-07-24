import React from 'react'
import { useRouteError } from 'react-router-dom'
import Page404 from '../page-404'
import isErrorWithStatus from './helpers'
import { Error } from '../../components'
import Page500 from '../page-500'
const ErrorPage = () => {
  const error = useRouteError()
  const isError = isErrorWithStatus(error)
  if (isError && error.status === 404) {
    return <Page404 />
  } else if (isError && error.status === 500) {
    return <Page500 />
  } else {
    return <Error />
  }
}

export default ErrorPage
