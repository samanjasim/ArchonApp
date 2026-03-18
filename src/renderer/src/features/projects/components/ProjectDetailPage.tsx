import { useParams } from 'react-router-dom'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-forge-text-primary">Project Detail</h1>
      <p className="mt-2 text-sm text-forge-text-secondary">
        Project ID: {id}
      </p>
    </div>
  )
}
