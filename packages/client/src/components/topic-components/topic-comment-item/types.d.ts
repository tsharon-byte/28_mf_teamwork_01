import { TComment } from '../../../store/slices/comments-slice/types'
import { EmojiType } from '../../../store/slices/emoji-slice/types'

type TopicCommentItemType = {
  id: number
  topicId: number
  text: string
  author: number
  date: string
  replyComments?: Array<TComment>
  isReply: boolean
}

type EmojiesType = {
  emoji: EmojiType
}

type EmojiesForComment = {
  code: 'string'
  count: number
}
