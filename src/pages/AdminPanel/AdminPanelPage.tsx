import { useState } from 'react'
import { AdminSectionPage } from '../AdminSection'
import { SharedInboxesPage } from '../SharedInboxes'

export type AdminPanelSection = 'shared-inbox' | 'schedule' | 'settings'

/**
 * The admin panel with its Admin sidebar working: Shared Inbox, Schedule and Settings each open their page and Sub-nav.
 * The other sidebar items are not built yet and do nothing.
 */
export function AdminPanelPage({ section: initial = 'shared-inbox' }: { section?: AdminPanelSection }) {
  const [section, setSection] = useState<AdminPanelSection>(initial)
  const go = (id: string) => { if (id === 'shared-inbox' || id === 'schedule' || id === 'settings') setSection(id) }
  return section === 'shared-inbox'
    ? <SharedInboxesPage key="shared-inbox" channel="email" onAdminNavigate={go} />
    : <AdminSectionPage key={section} section={section} onAdminNavigate={go} />
}
