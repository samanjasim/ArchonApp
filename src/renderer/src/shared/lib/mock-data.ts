// Mock data for development — will be replaced by API calls

export type Priority = 'critical' | 'high' | 'medium' | 'low'
export type ProjectStatus = 'draft' | 'active' | 'paused' | 'archived'
export type WorkItemStatus = 'in_progress' | 'waiting_approval' | 'ready' | 'blocked' | 'completed' | 'pending'
export type ActivitySource = 'system' | 'github' | 'user'
export type ActivityEventType =
  | 'stage_started'
  | 'stage_completed'
  | 'push_detected'
  | 'pr_merged'
  | 'approval_given'
  | 'checks_passed'

export interface MockProject {
  id: string
  name: string
  slug: string
  description?: string
  status: ProjectStatus
  createdAt: string
  workItems: MockWorkItem[]
}

export interface MockWorkItem {
  id: string
  title: string
  projectId: string
  projectName: string
  stageName: string
  stageDescription: string
  status: WorkItemStatus
  priority: Priority
  elapsedMinutes?: number
  lastEvent?: string
  lastEventTime?: string
  updatedAgo?: string
}

export interface MockActivity {
  id: string
  timestamp: string
  relativeTime: string
  source: ActivitySource
  eventType: ActivityEventType
  message: string
  projectName: string
}

export const mockProjects: MockProject[] = [
  {
    id: 'p1',
    name: 'Horizon Platform',
    slug: 'horizon-platform',
    description: 'SaaS platform with .NET backend, React frontend, and Flutter mobile app',
    status: 'active',
    createdAt: '2 weeks ago',
    workItems: [
      {
        id: 'wi1',
        title: 'Payment gateway integration',
        projectId: 'p1',
        projectName: 'Horizon Platform',
        stageName: 'Backend Review',
        stageDescription: 'waiting approval',
        status: 'waiting_approval',
        priority: 'critical',
        updatedAgo: '2h',
      },
      {
        id: 'wi2',
        title: 'User settings redesign',
        projectId: 'p1',
        projectName: 'Horizon Platform',
        stageName: 'Design',
        stageDescription: 'ready to start',
        status: 'ready',
        priority: 'medium',
        updatedAgo: '1h',
      },
      {
        id: 'wi4',
        title: 'Product reviews',
        projectId: 'p1',
        projectName: 'Horizon Platform',
        stageName: 'Frontend Dev',
        stageDescription: '',
        status: 'in_progress',
        priority: 'medium',
        elapsedMinutes: 42,
        lastEvent: '4 commits pushed 3 min ago',
        updatedAgo: '42m',
      },
      {
        id: 'wi3',
        title: 'Cart tax fix',
        projectId: 'p1',
        projectName: 'Horizon Platform',
        stageName: 'Verify',
        stageDescription: 'needs manual testing',
        status: 'waiting_approval',
        priority: 'high',
        updatedAgo: '3h',
      },
      {
        id: 'wi6',
        title: 'Login redesign',
        projectId: 'p1',
        projectName: 'Horizon Platform',
        stageName: 'Done',
        stageDescription: '',
        status: 'completed',
        priority: 'low',
        updatedAgo: '1d',
      },
      {
        id: 'wi7',
        title: 'API documentation',
        projectId: 'p1',
        projectName: 'Horizon Platform',
        stageName: 'Done',
        stageDescription: '',
        status: 'completed',
        priority: 'low',
        updatedAgo: '2d',
      },
      {
        id: 'wi8',
        title: 'Dark mode support',
        projectId: 'p1',
        projectName: 'Horizon Platform',
        stageName: 'Paused',
        stageDescription: '',
        status: 'pending',
        priority: 'low',
        updatedAgo: '3d',
      },
    ],
  },
  {
    id: 'p2',
    name: 'Vortex Mobile',
    slug: 'vortex-mobile',
    description: 'Flutter mobile app for the Vortex ecosystem',
    status: 'active',
    createdAt: '1 week ago',
    workItems: [
      {
        id: 'wi5',
        title: 'Auth flow',
        projectId: 'p2',
        projectName: 'Vortex Mobile',
        stageName: 'Backend Dev',
        stageDescription: '',
        status: 'in_progress',
        priority: 'high',
        elapsedMinutes: 75,
        lastEvent: 'CI checks passed 8 min ago',
        updatedAgo: '1h',
      },
    ],
  },
  {
    id: 'p3',
    name: 'Nebula API',
    slug: 'nebula-api',
    description: 'GraphQL API gateway for microservices',
    status: 'paused',
    createdAt: '1 month ago',
    workItems: [],
  },
]

export const mockActivities: MockActivity[] = [
  {
    id: 'a1',
    timestamp: '2026-03-18T02:48:00Z',
    relativeTime: '12m ago',
    source: 'system',
    eventType: 'stage_started',
    message: 'Frontend Dev started for "Product reviews"',
    projectName: 'Horizon Platform',
  },
  {
    id: 'a2',
    timestamp: '2026-03-18T02:32:00Z',
    relativeTime: '28m ago',
    source: 'github',
    eventType: 'push_detected',
    message: '4 commits pushed to feat/product-reviews',
    projectName: 'Horizon Platform',
  },
  {
    id: 'a3',
    timestamp: '2026-03-18T02:00:00Z',
    relativeTime: '1h ago',
    source: 'user',
    eventType: 'approval_given',
    message: 'Backend Review approved for "Product reviews"',
    projectName: 'Horizon Platform',
  },
  {
    id: 'a4',
    timestamp: '2026-03-18T02:00:00Z',
    relativeTime: '1h ago',
    source: 'github',
    eventType: 'pr_merged',
    message: 'PR #47 merged into develop',
    projectName: 'Horizon Platform',
  },
  {
    id: 'a5',
    timestamp: '2026-03-18T00:00:00Z',
    relativeTime: '3h ago',
    source: 'system',
    eventType: 'stage_completed',
    message: 'Backend Dev completed (1h 42m)',
    projectName: 'Horizon Platform',
  },
]

// Derived helpers
export function getActionItems(): MockWorkItem[] {
  return mockProjects
    .flatMap((p) => p.workItems)
    .filter((wi) => wi.status === 'waiting_approval' || wi.status === 'ready')
}

export function getInProgressItems(): MockWorkItem[] {
  return mockProjects.flatMap((p) => p.workItems).filter((wi) => wi.status === 'in_progress')
}

// Re-export for backwards compatibility
export { formatElapsed } from './format'

// Slug helpers
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function isSlugTaken(slug: string): boolean {
  return mockProjects.some((p) => p.slug === slug)
}

export function addMockProject(name: string, description?: string): MockProject {
  const slug = generateSlug(name)
  const project: MockProject = {
    id: `p${Date.now()}`,
    name,
    slug,
    description,
    status: 'draft',
    createdAt: 'just now',
    workItems: [],
  }
  mockProjects.push(project)
  return project
}

export function findProjectById(id: string): MockProject | undefined {
  return mockProjects.find((p) => p.id === id)
}

export function getProjectStats(project: MockProject) {
  const active = project.workItems.filter(
    (wi) => wi.status === 'in_progress' || wi.status === 'waiting_approval' || wi.status === 'ready' || wi.status === 'blocked',
  ).length
  const completed = project.workItems.filter((wi) => wi.status === 'completed').length
  const paused = project.workItems.filter((wi) => wi.status === 'pending').length
  return { active, completed, paused, total: project.workItems.length }
}
