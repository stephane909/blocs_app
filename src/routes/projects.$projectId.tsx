import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectPage,
})

function ProjectPage() {
  const { projectId } = Route.useParams()

  return <h1>Project {projectId}</h1>
}
