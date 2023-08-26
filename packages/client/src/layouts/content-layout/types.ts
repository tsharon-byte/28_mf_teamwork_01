import { ReactNode, UIEventHandler } from 'react'
import IPageLayoutProps from '../page-layout/types'

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
}

export default IContentLayoutProps
