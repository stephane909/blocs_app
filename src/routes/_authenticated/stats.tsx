import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/stats')({
  component: StatsPage,
})

function StatsPage() {
  return <h1>Stats</h1>
}
