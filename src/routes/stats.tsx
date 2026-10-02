import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats')({
  component: StatsPage,
})

function StatsPage() {
  return <h1>Stats</h1>
}
