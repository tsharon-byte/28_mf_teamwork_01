import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { ContentLayout } from '../../layouts'
import { CircularProgress } from '@mui/material'
import { useAppDispatch } from '../../store/hooks'
import {
  createChatThunk,
  getChatListThunk,
} from '../../store/slices/forum-slice/thunks'
import { ROUTE_PATH } from '../../utils/constants'
import { CreateTopicModal } from '../../components/forum-components/create-topic-modal'
import { useChats } from '../../hooks'
import { ForumFooter } from '../../components/forum-components/forum-footer'
import { TopicItem } from '../../components/forum-components/topic-item'
import { useNavigate } from 'react-router-dom'
import { SearchAndSelectBox } from '../../components/forum-components/search-and-select-box'
import { Title } from '../../components'
import { NoDiscussionIcon } from '../../icons'

const Forum: FC = () => {
  const dispatch = useAppDispatch()
  const { chats, loading, error } = useChats()
  const [changedChats, setChangedChats] = useState(chats)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [chatName, setChatName] = useState('')
  const [chatDescription, setChatDescription] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setChangedChats(chats)
  }, [chats])

  const handleChangeChatName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget
      setChatName(value)
    },
    [setChatName]
  )

  const handleChangeChatDescription = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget
      setChatDescription(value)
    },
    [setChatDescription]
  )

  const handleCancel = useCallback(() => {
    setIsOpenModal(false)
    setChatName('')
  }, [setIsOpenModal, setChatName])

  const handleCreateChatSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (chatName.trim() !== '') {
        dispatch(
          createChatThunk({ name: chatName, description: chatDescription })
        )
          .unwrap()
          .then(() => {
            setChatName('')
            setChatDescription('')
            dispatch(getChatListThunk())
            setIsOpenModal(false)
          })
      }
    },
    [chatName, chatDescription]
  )
  const handleOpenModal = useCallback(() => setIsOpenModal(true), [])
  const handleCloseModal = useCallback(() => setIsOpenModal(false), [])
  const handleNavigate = useCallback((id: number) => {
    navigate(`${ROUTE_PATH.FORUM}/${id}`)
  }, [])

  const handleSearch = useCallback(
    (value: string) => {
      if (value.trim() !== '') {
        const filteredChats = {
          ...chats,
          rows: chats.rows.filter(chat => chat.name.includes(value)),
        }
        setChangedChats(() => filteredChats)
      } else if (value.trim() === '') {
        setChangedChats(chats)
      }
    },
    [chats]
  )
  const handleSelect = useCallback(
    (value: string) => {
      if (value === 'Сначала новые') {
        const ASC = {
          ...chats,
          rows: [...chats.rows].sort((a, b) => b.id - a.id),
        }
        setChangedChats(() => ASC)
      } else if (value === 'Сначала старые') {
        const DESC = {
          ...chats,
          rows: [...chats.rows].sort((a, b) => a.id - b.id),
        }
        setChangedChats(DESC)
      }
    },
    [changedChats]
  )

  return (
    <>
      <ContentLayout
        header={
          chats.rows.length > 0 && <Title>any ideas for discussion?</Title>
        }
        footer={
          <ForumFooter
            isOpenModal={isOpenModal}
            handleOpenModal={handleOpenModal}
          />
        }>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {chats.rows.length === 0 && (
              <>
                <Title variant="h2">No one discussion</Title>
                <NoDiscussionIcon size={500} />
              </>
            )}
            {chats.rows.length > 0 && (
              <>
                <SearchAndSelectBox
                  handleSearch={handleSearch}
                  handleSelect={handleSelect}
                />
                {changedChats.rows.map(chat => {
                  const { id } = chat
                  return (
                    <TopicItem
                      key={id}
                      chat={chat}
                      handleNavigate={handleNavigate}
                    />
                  )
                })}
              </>
            )}
          </>
        )}
      </ContentLayout>
      <CreateTopicModal
        isOpenModal={isOpenModal}
        handleCancel={handleCancel}
        handleCloseModal={handleCloseModal}
        handleChangeChatName={handleChangeChatName}
        handleChangeChatDescription={handleChangeChatDescription}
        handleCreateChatSubmit={handleCreateChatSubmit}
        error={error?.message}
      />
    </>
  )
}

export default Forum
