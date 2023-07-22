import React from 'react'
import { useRouteError } from 'react-router-dom'
import Page404 from '../page-404'
import isErrorWithStatus from './helpers'
import { Error } from '../../components'

const ErrorPage = () => {
  const error = useRouteError()

  return isErrorWithStatus(error) && error.status === 404 ? (
    <Page404 />
  ) : (
    <Error />
  )
}

export default ErrorPage
