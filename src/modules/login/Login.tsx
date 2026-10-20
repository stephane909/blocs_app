import { useState, type FormEvent } from 'react'
import { Button } from '../../commons/Button'
import { Input } from '../../commons/Input'
import { useUserConnection } from '../../features/userConnection/userConnection'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, error, isLoading, connect } = useUserConnection()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void connect({ email, password })
  }

  if (user) {
    return <p>Connecté en tant que {user.name}</p>
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
      {error && <p role="alert">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Connexion…' : 'Se connecter'}
      </Button>
    </form>
  )
}
