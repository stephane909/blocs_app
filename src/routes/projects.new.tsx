import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/new')({
  component: NewProjectPage,
})

function NewProjectPage() {
  return <h1>New project</h1>
}
