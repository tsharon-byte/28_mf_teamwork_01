import { ReactNode } from 'react'

interface IPageLayoutProps {
  children: ReactNode
  navigation?: boolean
  pageClassName?: string
  headerClassName?: string
  mainClassName?: string
  footerClassName?: string
  mode: 'dark' | 'light'
  toggleTheme: () => void
}

export default IPageLayoutProps
