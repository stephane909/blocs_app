/**
 * Formulaire de connexion.
 *
 * Affiché dans l'onglet « Login » de la page d'accueil.
 * En cas de succès, l'utilisateur est enregistré dans le store partagé
 * (via `useUserConnection`) puis redirigé vers le dashboard.
 */
import { useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { Button } from '../../commons/Button'
import { Input } from '../../commons/Input'
import { useUserConnection } from '../../features/userConnection/userConnection'

export function Login() {
  // Valeurs saisies dans les champs (champs « contrôlés » : React garde la valeur)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // `connect` lance la connexion ; `error` et `isLoading` servent à l'affichage
  const { error, isLoading, connect } = useUserConnection()

  // Fonction de TanStack Router pour changer de page depuis le code
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Empêche le comportement par défaut du navigateur (recharger la page)
    event.preventDefault()

    // Renvoie l'utilisateur si la connexion réussit, `null` sinon
    const connectedUser = await connect({ email, password })

    if (connectedUser) {
      // L'utilisateur est déjà dans le store : la protection de /dashboard le laisse passer
      await navigate({ to: '/dashboard' })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="Mot de passe"
        type="password"
        name="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {/* Message d'erreur ; role="alert" le fait lire par les lecteurs d'écran */}
      {error && <p role="alert">{error}</p>}

      {/* Bouton désactivé pendant la requête pour éviter les doubles envois */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Connexion…' : 'Se connecter'}
      </Button>
    </form>
  )
}
