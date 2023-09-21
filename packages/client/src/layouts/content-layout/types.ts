import { ReactNode, UIEventHandler } from 'react'
import IPageLayoutProps from '../page-layout/types'
import { ThemeType } from '../../store/slices/user-slice/types'

interface IContentLayoutProps {
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
  navigation?: boolean
  headerClassName?: string
  mainClassName?: string
  footerClassName?: string
  pageClassNames?: Omit<IPageLayoutProps, 'children' | 'navigation'>
  onScroll?: UIEventHandler<HTMLDivElement>
  theme?: ThemeType
  toggleTheme?: () => void
}

export default IContentLayoutProps
