import { useState } from 'react'
import { userConnectionRepository } from './userConnectionRepository'
import type {
  User,
  UserConnectionCommand,
  UserConnectionRepository,
} from './userConnectionRepository'

export function useUserConnection(
  repository: UserConnectionRepository = userConnectionRepository,
) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function connect(command: UserConnectionCommand) {
    setIsLoading(true)
    setError(null)

    try {
      setUser(await repository.connect(command))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return { user, error, isLoading, connect }
}
