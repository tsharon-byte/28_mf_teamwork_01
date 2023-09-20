import { ReactNode } from 'react'
import { Mode } from '../../store/slices/user-slice/types'

interface IPageLayoutProps {
  children: ReactNode
  navigation?: boolean
  pageClassName?: string
  headerClassName?: string
  mainClassName?: string
  footerClassName?: string
  mode?: Mode
  toggleTheme?: () => void
}

export default IPageLayoutProps
