/**
 * Point d'entrée de la feature `userConnection`.
 *
 * Le reste de l'application importe depuis ce fichier uniquement,
 * sans connaître l'organisation interne de la feature.
 */

// Hook de connexion, utilisé par le formulaire Login
export { useUserConnection } from './useUserConnection'

// Accès à l'utilisateur connecté :
// - `useConnectedUser` dans les composants React
// - `getConnectedUser` hors de React (ex. protection des pages dans le routeur)
// - `setConnectedUser` pour connecter / déconnecter (ex. `setConnectedUser(null)`)
export {
  getConnectedUser,
  setConnectedUser,
  useConnectedUser,
} from './userConnectionStore'

// Types de la feature
export type {
  User,
  UserConnectionCommand,
  UserConnectionRepository,
} from './userConnectionRepository'
