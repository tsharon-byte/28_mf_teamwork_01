import React, { memo, FC, useState, ChangeEvent } from 'react'
import { TextField } from '../..'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SearchInputType } from './types'
import styles from './styles.module.css'

export const SearchInput: FC<SearchInputType> = memo(
  ({ handleSearch, placeholder }) => {
    const [currentValue, setCurrentValue] = useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget
      setCurrentValue(value)
      handleSearch(value)
    }

    return (
      <TextField
        className={styles.field}
        value={currentValue}
        onChange={onChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="silver" />
            </InputAdornment>
          ),
        }}
      />
    )
  }
)
