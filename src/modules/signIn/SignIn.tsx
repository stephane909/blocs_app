import { useState, type FormEvent } from 'react'
import { Button } from '../../commons/Button'
import { Input } from '../../commons/Input'

export function SignIn() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: call the registration API
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Nom"
        type="text"
        name="name"
        autoComplete="name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
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
        autoComplete="new-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit">S'inscrire</Button>
    </form>
  )
}
