// Mock data for development — will be replaced by API calls

export type Priority = 'critical' | 'high' | 'medium' | 'low'
export type ProjectStatus = 'active' | 'paused' | 'archived'
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
  status: ProjectStatus
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
    status: 'active',
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
      },
    ],
  },
  {
    id: 'p2',
    name: 'Vortex Mobile',
    status: 'active',
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
      },
    ],
  },
  {
    id: 'p3',
    name: 'Nebula API',
    status: 'paused',
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

export function formatElapsed(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}
