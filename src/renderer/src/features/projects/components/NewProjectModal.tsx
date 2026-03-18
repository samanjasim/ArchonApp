import { useState, useMemo, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, AlertCircle, ArrowRight, Link as LinkIcon } from 'lucide-react'
import { Modal, ModalHeader, ModalFooter } from '@/shared/components/ui/Modal'
import { Input } from '@/shared/components/ui/Input'
import { Textarea } from '@/shared/components/ui/Textarea'
import { Button } from '@/shared/components/ui/Button'
import { generateSlug, isSlugTaken, addMockProject } from '@/shared/lib/mock-data'

interface NewProjectModalProps {
  open: boolean
  onClose: () => void
}

export function NewProjectModal({ open, onClose }: NewProjectModalProps) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const slug = useMemo(() => generateSlug(name), [name])
  const duplicateSlug = slug.length > 0 && isSlugTaken(slug)
  const nameEmpty = submitted && name.trim().length === 0
  const hasError = nameEmpty || duplicateSlug

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault()
    setSubmitted(true)

    if (!name.trim() || duplicateSlug) return

    const project = addMockProject(name.trim(), description.trim() || undefined)
    resetAndClose()
    navigate(`/projects/${project.id}`)
  }

  function resetAndClose() {
    setName('')
    setDescription('')
    setSubmitted(false)
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Modal open={open} onClose={resetAndClose}>
      <ModalHeader
        icon={<FolderOpen size={20} className="text-forge-accent" />}
        title="New Project"
        subtitle="Create a new project workspace. You can configure repos and skills after creation."
        onClose={resetAndClose}
      />

      <form onSubmit={handleSubmit} className="px-6 pb-2">
        {/* Project Name */}
        <div>
          <label className="mb-1.5 block text-sm text-forge-text-secondary">
            Project Name <span className="text-forge-accent">*</span>
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="My Project"
            autoFocus
            error={hasError}
          />

          {/* Slug preview or error */}
          {duplicateSlug ? (
            <div className="mt-1.5">
              <div className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle size={12} />
                <span>A project with slug &quot;{slug}&quot; already exists</span>
              </div>
              <div className="mt-0.5 font-mono text-xs text-red-400">
                ~/Archon/projects/<span className="font-semibold">{slug}</span>
              </div>
            </div>
          ) : nameEmpty ? (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle size={12} />
              <span>Project name is required</span>
            </div>
          ) : slug.length > 0 ? (
            <div className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-forge-text-secondary">
              <LinkIcon size={11} />
              <span>~/Archon/projects/</span>
              <span className="font-semibold text-forge-text-primary">{slug}</span>
            </div>
          ) : null}
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm text-forge-text-secondary">
            Description <span className="text-forge-text-secondary/50">(optional)</span>
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief project description..."
            rows={3}
          />
        </div>
      </form>

      <ModalFooter>
        {hasError && (
          <span className="mr-auto text-xs font-mono text-red-400">Fix errors to continue</span>
        )}
        <Button variant="secondary" type="button" onClick={resetAndClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => handleSubmit()}
          disabled={hasError && submitted}
          className="gap-2"
        >
          <span>Create Project</span>
          <ArrowRight size={14} />
        </Button>
      </ModalFooter>

      <div className="pb-4 text-center">
        <span className="font-mono text-xs text-forge-text-secondary/50">esc to cancel</span>
      </div>
    </Modal>
  )
}
