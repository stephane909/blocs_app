/**
 * Route de protection : toutes les pages qui nécessitent d'être connecté.
 *
 * Convention TanStack Router :
 * - le `_` au début du nom en fait une route « sans chemin » (pathless) :
 *   elle n'ajoute rien à l'URL. `_authenticated/dashboard.tsx` répond
 *   donc à `/dashboard`, pas à `/_authenticated/dashboard`.
 * - toutes les routes placées dans le dossier `_authenticated/` passent
 *   d'abord par celle-ci.
 *
 * Pour protéger une nouvelle page, il suffit donc de créer son fichier
 * dans le dossier `src/routes/_authenticated/`.
 */
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getConnectedUser } from '../features/userConnection/userConnection'

export const Route = createFileRoute('/_authenticated')({
  /**
   * `beforeLoad` s'exécute AVANT d'afficher la page demandée.
   * S'il lance (`throw`) une redirection, la page n'est jamais affichée.
   *
   * On utilise `getConnectedUser()` (et pas un hook) car `beforeLoad`
   * n'est pas un composant React : les hooks n'y fonctionnent pas.
   */
  beforeLoad: () => {
    if (!getConnectedUser()) {
      // Personne n'est connecté : retour à l'accueil, où se trouve le formulaire de connexion
      throw redirect({ to: '/' })
    }
  },
  // Pas de mise en page particulière : on affiche simplement la page demandée
  component: Outlet,
})
