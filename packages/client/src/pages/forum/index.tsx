import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { ContentLayout } from '../../layouts'
import { CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  createChatThunk,
  getChatListThunk,
} from '../../store/slices/forum-slice/thunks'
import { ROUTE_PATH } from '../../utils/constants'
import { CreateTopicModal } from '../../components/forum-components/create-topic-modal'
import { useChats } from '../../hooks'
import { ForumFooter } from '../../components/forum-components/forum-footer'
import { ForumImage } from '../../components/forum-components/forum-image'
import { TopicItem } from '../../components/forum-components/topic-item'
import { useNavigate } from 'react-router-dom'
import { SearchAndSelectBox } from '../../components/forum-components/search-and-select-box'
import { Title } from '../../components'
import { userSelector } from '../../store/slices/user-slice/selectors'
import { changeThemeThunk } from '../../store/slices/user-slice/thunks'
import { useTheme } from '../../hooks/use-theme'

const Forum: FC = () => {
  const dispatch = useAppDispatch()
  const { chats, loading, error } = useChats()
  const [changedChats, setChangedChats] = useState(chats)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [chatName, setChatName] = useState('')
  const navigate = useNavigate()
  const { theme, toggleThemeCallback } = useTheme()
  useEffect(() => {
    setChangedChats(chats)
  }, [chats])
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
          .unwrap()
          .then(() => {
            setChatName('')
            dispatch(getChatListThunk())
            setIsOpenModal(false)
          })
      }
    },
    [chatName]
  )
  const handleOpenModal = useCallback(() => setIsOpenModal(true), [])
  const handleCloseModal = useCallback(() => setIsOpenModal(false), [])
  const handleNavigate = useCallback((id: number) => {
    navigate(`${ROUTE_PATH.FORUM}/${id}`)
  }, [])
  const handleSearch = useCallback(
    (value: string) => {
      if (value.trim() !== '') {
        const filteredChats = chats.filter(chat => chat.title.includes(value))
        setChangedChats(filteredChats)
      } else if (value.trim() === '') {
        setChangedChats(chats)
      }
    },
    [chats]
  )
  const handleSelect = useCallback(
    (value: string) => {
      if (value === 'Сначала новые') {
        setChangedChats([...changedChats].sort((a, b) => b.id - a.id))
      } else if (value === 'Сначала старые') {
        setChangedChats([...changedChats].sort((a, b) => a.id - b.id))
      }
    },
    [changedChats]
  )

  return (
    <>
      <ContentLayout
        theme={theme}
        toggleTheme={toggleThemeCallback}
        header={chats.length > 0 && <Title>any ideas for discussion?</Title>}
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
            {chats.length === 0 && (
              <>
                <Title>No one discussion</Title>
                <ForumImage theme={theme} />
              </>
            )}
            {chats.length > 0 && (
              <>
                <SearchAndSelectBox
                  handleSearch={handleSearch}
                  handleSelect={handleSelect}
                />
                {changedChats.map(chat => {
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
        handleChange={handleChange}
        handleCreateChatSubmit={handleCreateChatSubmit}
        error={error?.message}
      />
    </>
  )
}

export default Forum
