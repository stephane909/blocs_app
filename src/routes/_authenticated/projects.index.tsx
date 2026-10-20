import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/projects/')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return <h1>Projects</h1>
}
