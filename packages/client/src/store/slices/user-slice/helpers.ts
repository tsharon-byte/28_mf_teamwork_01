import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../utils/localStorageHelper'
import { Nullable } from '../../../types'
import { IUser, IUserState } from './types'

const USER_IN_LOCAL_STORAGE = 'user'

export const getUserFromStorage = (initialState: IUserState) => {
  const state = { ...initialState }
  state.user = getFromLocalStorage(USER_IN_LOCAL_STORAGE)
  return state
}

export const setUserToStorage = (user: Nullable<IUser>) => {
  setToLocalStorage(USER_IN_LOCAL_STORAGE, user)
}

export const deleteUserFromStorage = () => {
  deleteFromLocalStorage(USER_IN_LOCAL_STORAGE)
}
