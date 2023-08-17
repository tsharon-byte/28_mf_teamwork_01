import { ChatType } from '../../../store/slices/forum-slice/types'

export type TopicItemType = {
  chat: ChatType
  handleNavigate: (id: number) => void
}
