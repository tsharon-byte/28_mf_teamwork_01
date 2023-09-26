import { Box, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import React, { memo, FC, useState } from 'react'
import { SearchInput } from '../search-input'
import { SearchAndSelectBoxType } from './types'
import styles from './styles.module.css'

export const SearchAndSelectBox: FC<SearchAndSelectBoxType> = memo(
  ({ handleSearch, handleSelect }) => {
    const [selectValue, setSelectValue] = useState('Сначала новые')
    const selectCallback = (e: SelectChangeEvent<string>) => {
      const { value } = e.target
      setSelectValue(value)
      handleSelect(value)
    }
    return (
      <Box className={styles.box}>
        <SearchInput
          placeholder="Поиск по названию чата"
          handleSearch={handleSearch}
        />
        <Select
          value={selectValue}
          onChange={selectCallback}
          className={styles.ordering}
        >
          <MenuItem value="Сначала новые">Сначала новые</MenuItem>
          <MenuItem value="Сначала старые">Сначала старые</MenuItem>
        </Select>
      </Box>
    )
  }
)
