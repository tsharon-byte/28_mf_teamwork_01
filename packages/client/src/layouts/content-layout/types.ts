import { ReactNode } from 'react'

interface IContentLayoutProps {
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
  navigation?: boolean
  className?: string
}

export default IContentLayoutProps
