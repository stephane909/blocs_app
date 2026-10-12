import type {
  User,
  UserConnectionRepository,
} from './userConnectionRepository'

// Mock: simulates the authentication API until the real backend exists
const MOCK_USERS: { user: User; password: string }[] = [
  {
    user: { id: '1', name: 'Alice Martin', email: 'alice@test.fr' },
    password: 'alice123',
  },
  {
    user: { id: '2', name: 'Bruno Petit', email: 'bruno@test.fr' },
    password: 'bruno123',
  },
  {
    user: { id: '3', name: 'Chloé Durand', email: 'chloe@test.fr' },
    password: 'chloe123',
  },
]

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const userConnectionFakeRepository: UserConnectionRepository = {
  async connect({ email, password }) {
    await delay(500)

    const entry = MOCK_USERS.find(
      (storedUser) =>
        storedUser.user.email === email && storedUser.password === password,
    )

    if (!entry) {
      throw new Error('Identifiants invalides')
    }

    return entry.user
  },
}
