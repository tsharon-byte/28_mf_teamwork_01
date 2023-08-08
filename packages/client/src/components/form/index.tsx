import React, { FC, FormEventHandler, forwardRef } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'

import type IFormProps from './types'

const Form: FC<IFormProps> = forwardRef(
  ({ validator, onSubmit, children, className, ...props }, ref) => {
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
        className={classNames(styles.form, className)}
        ref={ref}>
        {children}
      </form>
    )
  }
)

export default Form
