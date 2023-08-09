import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { ContentLayout } from '../../layouts'
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  createChatThunk,
  retrieveChatsThunk,
} from '../../store/slices/forum-slice/thunks'
import { forumSelector } from '../../store/slices/forum-slice/selectors'
import StyledLink from '../../components/styled-link'
import { ROUTE_PATH } from '../../utils/constants'

const Forum: FC = () => {
  const dispatch = useAppDispatch()
  const { chats, loading } = useAppSelector(forumSelector)
  const [isNewInput, setIsNewInput] = useState(false)
  const [chatName, setChatName] = useState('')
  useEffect(() => {
    dispatch(retrieveChatsThunk())
  }, [dispatch])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget
      setChatName(value)
    },
    [setChatName]
  )

  const handleCancel = useCallback(() => {
    setIsNewInput(false)
    setChatName('')
  }, [setIsNewInput, setChatName])

  const handleCreateChat = useCallback(() => {
    if (chatName.trim() !== '') {
      dispatch(createChatThunk(chatName))
        .then(() => {
          setChatName('')
          setIsNewInput(false)
        })
        .then(() => {
          dispatch(retrieveChatsThunk())
        })
    }
  }, [chatName])

  return (
    <ContentLayout>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {chats.map(chat => {
            const { id, title } = chat
            return (
              <StyledLink
                key={id}
                text={title}
                to={`${ROUTE_PATH.FORUM}/${id}`}
              />
            )
          })}
        </>
      )}
      {!isNewInput && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsNewInput(true)}>
          Создать топик
        </Button>
      )}
      {isNewInput && (
        <>
          <TextField
            sx={{ width: 600 }}
            onChange={handleChange}
            label="Создать новый топик"
            focused
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Add
                    sx={{
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      ':hover': '#FCD448',
                    }}
                    onClick={handleCreateChat}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Отменить
          </Button>
        </>
      )}
    </ContentLayout>
  )
}

export default Forum
