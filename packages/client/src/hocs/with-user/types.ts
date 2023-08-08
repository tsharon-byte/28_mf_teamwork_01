import { FC, ReactElement } from 'react'
import { IUser } from '../../store/slices/user-slice/types'
import { Nullable } from '../../types'

interface IWithUserProps {
  errorComponent?: Nullable<ReactElement>
  defaultComponent?: Nullable<ReactElement>
  errorPropName?: string
}

export type TUserDependentProp<P, K extends keyof P> = (user: IUser) => P[K]

type TWrappedComponentProps<P> = {
  [K in keyof P]: P[K] | TUserDependentProp<P, K>
}

type TWithUserHOC = <P>() => (
  WrappedComponent: FC<Omit<IWithUserProps & P, keyof IWithUserProps>>
) => (
  props: IWithUserProps & TWrappedComponentProps<P>
) => Nullable<ReactElement>

export type ExtractFCPropsType<T> = T extends FC<infer P>
  ? P
  : Record<string, unknown>

export default TWithUserHOC
