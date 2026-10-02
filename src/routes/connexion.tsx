import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/connexion')({
  component: ConnexionPage,
})

function ConnexionPage() {
  return <h1>Connexion</h1>
}
