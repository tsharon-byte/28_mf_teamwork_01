import React, { FC, FormEventHandler, Children, isValidElement } from 'react'
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

      Children.forEach(children, child => {
        if (isValidElement(child) && child.props.name) {
          jsonData[child.props.name] = formData.get(child.props.name)
        }
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
