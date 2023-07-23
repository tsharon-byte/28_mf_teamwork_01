import React, { FC, FormEventHandler } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'

import type IFormProps from './types'

const Form: FC<IFormProps> = ({
  validator,
  onSubmit,
  children,
  className,
  ...props
}) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    if (validator) {
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)
      const jsonData: Record<string, unknown> = {}

      formData.forEach((val, key) => {
        jsonData[key] = val
      })

      validator.validate(jsonData)

      if (validator.isValid) {
        onSubmit?.(event)
      }
    } else {
      onSubmit?.(event)
    }
  }

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={classNames(styles.form, className)}>
      {children}
    </form>
  )
}

export default Form
