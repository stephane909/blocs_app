import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$categoryId')({
  component: CategoryPage,
})

function CategoryPage() {
  const { categoryId } = Route.useParams()

  return <h1>Category {categoryId}</h1>
}
