import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/map')({
  component: MapPage,
})

function MapPage() {
  return <h1>Map</h1>
}
