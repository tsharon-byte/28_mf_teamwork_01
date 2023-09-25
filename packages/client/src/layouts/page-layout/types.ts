import { ReactNode } from 'react'
import { ThemeType } from '../../store/slices/user-slice/types'

interface IPageLayoutProps {
  children: ReactNode
  navigation?: boolean
  pageClassName?: string
  headerClassName?: string
  mainClassName?: string
  footerClassName?: string
  theme?: ThemeType
  toggleTheme?: () => void
}

export default IPageLayoutProps
