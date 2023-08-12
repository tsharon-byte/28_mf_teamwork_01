import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ContentLayout } from '../../layouts'
import { Button, CircularProgress, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  createChatThunk,
  retrieveChatsThunk,
} from '../../store/slices/forum-slice/thunks'
import { forumSelector } from '../../store/slices/forum-slice/selectors'
import StyledLink from '../../components/styled-link'
import { ROUTE_PATH } from '../../utils/constants'
import { CreateTopicModal } from '../../components/forum-components/create-topic-modal'

const Forum: FC = () => {
  const dispatch = useAppDispatch()
  const { chats, loading, error } = useAppSelector(forumSelector)
  const [isOpenModal, setIsOpenModal] = useState(false)
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
    setIsOpenModal(false)
    setChatName('')
  }, [setIsOpenModal, setChatName])

  const handleCreateChatSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (chatName.trim() !== '') {
        dispatch(createChatThunk(chatName))
          .then(() => {
            setChatName('')
            setIsOpenModal(false)
          })
          .then(() => {
            dispatch(retrieveChatsThunk())
          })
      }
    },
    [chatName]
  )
  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = useCallback(() => setIsOpenModal(false), [])
  return (
    <ContentLayout
      header={<Typography variant="h1">Список топиков</Typography>}>
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
      {!isOpenModal && (
        <Button variant="contained" color="secondary" onClick={handleOpenModal}>
          Создать топик
        </Button>
      )}
      <CreateTopicModal
        isOpenModal={isOpenModal}
        handleCancel={handleCancel}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
        handleCreateChatSubmit={handleCreateChatSubmit}
        error={error}
      />
    </ContentLayout>
  )
}

export default Forum
