import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader'
import { ProjectTabs, type ProjectTab } from './ProjectTabs'
import { WorkItemsTab } from './WorkItemsTab'
import { EmptyWorkItems } from './EmptyWorkItems'
import { findProjectById } from '@/shared/lib/mock-data'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<ProjectTab>('work-items')
  const project = findProjectById(id ?? '')

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-forge-text-secondary">Project not found</p>
      </div>
    )
  }

  function renderTabContent() {
    switch (activeTab) {
      case 'work-items':
        return project.workItems.length > 0 ? (
          <WorkItemsTab workItems={project.workItems} />
        ) : (
          <EmptyWorkItems />
        )
      case 'repos':
      case 'skills':
      case 'claude-md':
      case 'settings':
        return (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-forge-text-secondary">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} — coming soon
            </p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-full flex-col">
      <ProjectHeader project={project} />
      <ProjectTabs project={project} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  )
}
