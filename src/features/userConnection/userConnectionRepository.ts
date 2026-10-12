import { userConnectionFakeRepository } from './userConnectionFakeRepository'
// import { userConnectionFetchRepository } from './userConnectionFetchRepository'

export type UserConnectionCommand = {
  email: string
  password: string
}

export type User = {
  id: string
  name: string
  email: string
}

export interface UserConnectionRepository {
  connect(command: UserConnectionCommand): Promise<User>
}

// Repository used by the app: switch to userConnectionFetchRepository once the API is available
export const userConnectionRepository: UserConnectionRepository =
  userConnectionFakeRepository
