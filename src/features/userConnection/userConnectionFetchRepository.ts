import type {
  User,
  UserConnectionRepository,
} from './userConnectionRepository'

// TODO: set the authentication endpoint once the API is available
const USER_CONNECTION_ENDPOINT = ''

export const userConnectionFetchRepository: UserConnectionRepository = {
  async connect(command) {
    if (!USER_CONNECTION_ENDPOINT) {
      throw new Error("L'endpoint de connexion n'est pas encore configuré")
    }

    const response = await fetch(USER_CONNECTION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
    })

    if (!response.ok) {
      throw new Error('Identifiants invalides')
    }

    return (await response.json()) as User
  },
}
