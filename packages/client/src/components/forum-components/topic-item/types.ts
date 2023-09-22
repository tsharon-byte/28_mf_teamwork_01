import { TChatItem } from '../../../store/slices/forum-slice/types'

export type TopicItemType = {
  chat: TChatItem
  handleNavigate: (id: number) => void
}
