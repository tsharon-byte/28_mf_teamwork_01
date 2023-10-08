type Nullable<T> = T | null

export interface IUserData {
  yandexId: number
  avatar: Nullable<string>
  name: string
  score?: number
}
