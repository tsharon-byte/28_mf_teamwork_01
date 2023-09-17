import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import getEmojiListThunk from '../../store/slices/emoji-slice/thunks/get-emoji-list-thunk'
import emojiSelector from '../../store/slices/emoji-slice/selectors/emoji-selector'

const useEmoji = () => {
  const dispatch = useAppDispatch()
  const { loading, emojies, error } = useAppSelector(emojiSelector)

  useEffect(() => {
    if (!emojies || emojies.length === 0) {
      dispatch(getEmojiListThunk())
    }
  }, [emojies])

  return {
    loading,
    emojies,
    error,
  }
}

export default useEmoji
