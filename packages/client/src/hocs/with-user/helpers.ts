import { TUserDependentProp } from './types'

const isUserDependentProp = <P, K extends keyof P>(
  value: unknown
): value is TUserDependentProp<P, K> => typeof value === 'function'

export default isUserDependentProp
