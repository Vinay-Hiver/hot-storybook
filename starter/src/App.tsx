// Home and the Admin panel, switched from the Main nav (Conversations and Admin Panel). Both read their inboxes from data files:
// the Home page from src/pages/HomePage/homeData.ts, the Admin panel from src/pages/SharedInboxes/data.ts.
import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { SharedInboxesPage } from './pages/SharedInboxes'

export default function App() {
  const [page, setPage] = useState<'home' | 'admin'>('home')
  // Only Conversations and Admin Panel have a page; the other Main nav items stay where they are.
  const onNavChange = (id: string) => { if (id === 'admin') setPage('admin'); else if (id === 'conversations') setPage('home') }
  return page === 'admin' ? <SharedInboxesPage onNavChange={onNavChange} /> : <HomePage onNavChange={onNavChange} />
}
