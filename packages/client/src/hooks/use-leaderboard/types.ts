export interface ICreateLeaderboardRequestData<T> {
  data: T
  ratingFieldName: string
  teamName: string
}

export interface IRetrieveLeaderboardRequestData {
  ratingFieldName: string
  cursor: number
  limit: number
}
