export interface IUser {
  id: number
  first_name?: string
  second_name?: string
  display_name: string
  login?: string
  email?: string
  phone?: string
  avatar?: string
}

export interface ISWEvents extends Event {
  waitUntil: <T>(arg: () => Promise<T>) => void
  request: string
  respondWith: (arg: Promise<Response>) => void
}
