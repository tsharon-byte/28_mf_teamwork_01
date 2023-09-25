import { TComment } from '../../../store/slices/comments-slice/types'

export type TopicCommentItemType = {
  id: number
  topicId: number
  text: string
  author: number
  date: string
  replyComments?: Array<TComment>
  isReply: boolean
}
