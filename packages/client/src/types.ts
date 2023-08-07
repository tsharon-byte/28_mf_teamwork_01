export interface ISWEvents extends Event {
  waitUntil: <T>(arg: () => Promise<T>) => void
  request: string
  respondWith: (arg: Promise<Response>) => void
}

export type Nullable<T> = T | null
