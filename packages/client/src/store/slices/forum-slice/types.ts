export type ChatType = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: LastMessage
}

interface LastMessage {
  user: User
  time: string
  content: string
}

interface User {
  first_name: string
  second_name: string
  avatar: string
  login: string
}
