import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { ContentLayout } from '../../layouts'
import { Button, Input, InputAdornment, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useAppDispatch } from '../../store/hooks'
import { retrieveChatsThunk } from '../../store/slices/forum-slice/thunks'
const Forum: FC = () => {
  const dispatch = useAppDispatch()
  const [isNewInput, setIsNewInput] = useState(false)
  const [chatName, setChatName] = useState('')

  useEffect(() => {
    const id = crypto.randomUUID()
    console.log(id)
    callbacks.getChats()
  }, [])

  const callbacks = {
    getChats: useCallback(() => dispatch(retrieveChatsThunk()), [dispatch]),
    handleChange: useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setChatName(value)
      },
      [setChatName]
    ),
    handleCancel: useCallback(() => {
      setIsNewInput(false)
      setChatName('')
    }, [setIsNewInput, setChatName]),
  }

  return (
    <ContentLayout>
      {!isNewInput && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsNewInput(true)}>
          Создать новый чат
        </Button>
      )}
      {isNewInput && (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={callbacks.handleCancel}>
            Отменить
          </Button>
          <TextField
            sx={{ width: 600 }}
            onChange={callbacks.handleChange}
            focused
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Add sx={{ cursor: 'pointer', color: '#FFFFFF' }} />
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
    </ContentLayout>
  )
}

export default Forum
