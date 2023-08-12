import { FC, ReactElement, ReactNode } from 'react'

export enum IconPosition {
  left = 'left',
  right = 'right',
}

type TWithIconProps = {
  icon: ReactNode
  iconPosition?: keyof typeof IconPosition
  rootClassName?: string
}

type TWithIconHOC = <P>() => (
  WrappedComponent: FC<Omit<TWithIconProps & P, keyof TWithIconProps>>
) => (props: TWithIconProps & P) => ReactElement

export default TWithIconHOC
