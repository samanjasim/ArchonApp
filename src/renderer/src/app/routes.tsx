import { Routes, Route } from 'react-router-dom'
import { CommandCenterPage } from '@/features/command-center'
import { ProjectListPage, ProjectDetailPage } from '@/features/projects'
import { ActivityPage } from '@/features/activity'
import { SettingsPage } from '@/features/settings'
import { SkillsPage } from '@/features/skills'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CommandCenterPage />} />
      <Route path="/projects" element={<ProjectListPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/activity" element={<ActivityPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}
