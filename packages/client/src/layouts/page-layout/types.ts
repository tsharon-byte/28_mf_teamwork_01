import { ReactNode } from 'react'

interface IPageLayoutProps {
  children: ReactNode
  navigation?: boolean
  pageClassName?: string
  headerClassName?: string
  mainClassName?: string
  footerClassName?: string
}

export default IPageLayoutProps
