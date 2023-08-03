import identity from '../identity'

const joinPath = (...args: string[]): string =>
  args
    .reduce<string[]>((arr, arg) => arr.concat(arg.split(/\/(?<!:\/)/)), [])
    .filter(identity)
    .join('/')

export default joinPath
