import { beInstance } from '../../utils/http-transport'
import { AxiosResponse } from 'axios'
import { BE_EMOJI_URL, COMMENTS_URL } from '../../constants/urls'

export const addEmoji = (
  comment_id: number,
  data: AddEmojiToCommentType
): Promise<AxiosResponse> => {
  return beInstance.patch(`${COMMENTS_URL}${comment_id}/${BE_EMOJI_URL}`, data)
}

export const getEmojiForComment = (
  comment_id: number
): Promise<AxiosResponse> => {
  return beInstance.get(`${COMMENTS_URL}${comment_id}/${BE_EMOJI_URL}`)
}
