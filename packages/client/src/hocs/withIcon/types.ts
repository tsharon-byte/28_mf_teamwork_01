import { FC, ReactElement, ReactNode } from 'react'

export enum IconPosition {
  left = 'left',
  right = 'right',
}

type TWithProps = {
  icon: ReactNode
  iconPosition?: keyof typeof IconPosition
  rootClassName?: string
}

type TWithIconHOC = <P>() => (
  WrappedComponent: FC<Omit<TWithProps & P, keyof TWithProps>>
) => (props: TWithProps & P) => ReactElement

export default TWithIconHOC
