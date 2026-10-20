/**
 * Hook de connexion.
 *
 * Fait le lien entre un formulaire (ex. `Login`) et le repository de connexion :
 * - lance la connexion (`connect`) ;
 * - expose l'état de la requête (`isLoading`, `error`) pour l'affichage ;
 * - enregistre l'utilisateur connecté dans le store partagé, pour qu'il soit
 *   connu de toute l'application (pages, routeur…).
 */
import { useState } from 'react'
import { userConnectionRepository } from './userConnectionRepository'
import type {
  User,
  UserConnectionCommand,
  UserConnectionRepository,
} from './userConnectionRepository'
import { setConnectedUser, useConnectedUser } from './userConnectionStore'

/**
 * @param repository Le repository à utiliser. Par défaut, celui choisi dans
 * `userConnectionRepository.ts` (fake ou fetch). On peut en passer un autre,
 * par exemple dans un test.
 */
export function useUserConnection(
  repository: UserConnectionRepository = userConnectionRepository,
) {
  // L'utilisateur vient du store partagé : il reste connu après un changement de page
  const user = useConnectedUser()

  // Ces deux états ne concernent que le formulaire en cours : ils restent locaux
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Tente de connecter l'utilisateur.
   * Renvoie l'utilisateur connecté si ça réussit, `null` sinon
   * (le message d'erreur est alors disponible dans `error`).
   */
  async function connect(command: UserConnectionCommand): Promise<User | null> {
    setIsLoading(true)
    setError(null)

    try {
      // `await` attend la réponse du repository (fake ou vraie API)
      const connectedUser = await repository.connect(command)
      // On l'enregistre dans le store : toute l'app sait maintenant qui est connecté
      setConnectedUser(connectedUser)
      return connectedUser
    } catch (err) {
      // Le repository a rejeté la connexion (ex. "Identifiants invalides")
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
      return null
    } finally {
      // `finally` s'exécute dans tous les cas, succès ou erreur
      setIsLoading(false)
    }
  }

  return { user, error, isLoading, connect }
}
