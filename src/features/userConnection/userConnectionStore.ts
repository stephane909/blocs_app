/**
 * Store de l'utilisateur connecté.
 *
 * Ce fichier garde en mémoire l'utilisateur connecté et le rend accessible
 * à toute l'application :
 * - aux composants React, via le hook `useConnectedUser()` ;
 * - au routeur (TanStack Router), via `getConnectedUser()`, notamment pour
 *   protéger les pages dans `beforeLoad`, qui s'exécute en dehors de React
 *   et ne peut donc pas utiliser de hooks.
 *
 * Principe : une simple variable (`connectedUser`) + une liste de fonctions
 * à prévenir (`listeners`) quand elle change. C'est le même principe que des
 * librairies comme Zustand, en version minimale.
 *
 * Limite actuelle : l'utilisateur est gardé en mémoire uniquement.
 * Recharger la page (F5) le fait perdre.
 */
import { useSyncExternalStore } from 'react'
import type { User } from './userConnectionRepository'

/** L'utilisateur connecté, ou `null` si personne n'est connecté. */
let connectedUser: User | null = null

/**
 * Les fonctions à appeler quand l'utilisateur change.
 * React y ajoute automatiquement une fonction pour chaque composant qui
 * utilise `useConnectedUser()`, afin de le réafficher au bon moment.
 * Un `Set` est une liste sans doublons.
 */
const listeners = new Set<() => void>()

/**
 * Renvoie l'utilisateur connecté (ou `null`).
 * Utilisable partout, y compris hors des composants React (ex. le routeur).
 */
export function getConnectedUser() {
  return connectedUser
}

/**
 * Change l'utilisateur connecté et prévient tous les abonnés.
 * - `setConnectedUser(user)` : connexion
 * - `setConnectedUser(null)` : déconnexion
 */
export function setConnectedUser(user: User | null) {
  connectedUser = user
  // On appelle chaque listener : React réaffiche les composants concernés
  listeners.forEach((listener) => listener())
}

/**
 * Abonne une fonction aux changements d'utilisateur.
 * Renvoie une fonction de désabonnement, que React appelle tout seul
 * quand le composant disparaît de l'écran.
 */
function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * Hook React : renvoie l'utilisateur connecté et réaffiche le composant
 * à chaque connexion / déconnexion.
 *
 * `useSyncExternalStore` est le hook officiel de React pour lire une donnée
 * stockée en dehors de React : on lui donne la fonction d'abonnement et la
 * fonction qui lit la valeur actuelle.
 */
export function useConnectedUser() {
  return useSyncExternalStore(subscribe, getConnectedUser)
}
