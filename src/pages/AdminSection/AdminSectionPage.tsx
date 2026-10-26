import { useState } from 'react'
import { AdminSidebar } from '../../patterns/AdminSidebar'
import { adminSampleSections } from '../../patterns/AdminSidebar/sampleData'
import { MainNav } from '../../patterns/MainNav'
import { navSampleFooterItems, navSampleItems, navSampleUserMenu } from '../../patterns/MainNav/sampleData'
import { PageLayout } from '../../patterns/PageLayout'
import { SubNav } from '../../patterns/SubNav'
import { getAdminSubNav } from '../../patterns/SubNav/data'
import type { AdminSubNavId } from '../../patterns/SubNav/data'
import { PageBar } from '../SharedInboxes/SharedInboxesPage'
import '../SharedInboxes/SharedInboxesPage.css'

export type AdminSectionPageProps = {
  /** Which admin section: Schedule or Settings. */
  section: AdminSubNavId
  /** The Sub-nav page that is selected first. Defaults to the section's first page. */
  item?: string
  /** Called with the id of the Admin sidebar item that was pressed, so a page above can switch to it. */
  onAdminNavigate?: (id: string) => void
}

/**
 * Admin panel > Schedule or Settings: the Sub-nav lists the section's pages (from the Sub-nav database).
 * Temporary: the pages themselves are not built yet, so the content shows a placeholder.
 */
export function AdminSectionPage({ section, item, onAdminNavigate }: AdminSectionPageProps) {
  const nav = getAdminSubNav(section)
  const [page, setPage] = useState(item ?? nav.defaultSelected)
  const selected = nav.items.find((i) => i.id === page) ?? nav.items[0]
  return (
    <PageLayout
      variant="admin"
      nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value="admin" user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
      sidebar={<AdminSidebar sections={adminSampleSections} value={section} onChange={onAdminNavigate} />}
      subNav={<SubNav title={nav.label} items={nav.items} value={selected.id} onChange={setPage} />}
    >
      <div className="hot-shared-inboxes__page">
        <PageBar title={selected.label} />
        <div className="hot-shared-inboxes__placeholder">{selected.label} page</div>
      </div>
    </PageLayout>
  )
}
