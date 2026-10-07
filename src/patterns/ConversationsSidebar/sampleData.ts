import type { ConversationsSidebarSection, ConversationsSidebarView } from './ConversationsSidebar'

/** Example inboxes and views, shared by the Conversations sidebar and Page layout stories. */
const views = (counts: boolean, n: number): ConversationsSidebarView[] => [
  { id: 'unassigned', label: 'Unassigned', icon: 'unassigned', count: counts ? n : undefined },
  { id: 'bot', label: 'Assigned to Bot', icon: 'bot', count: counts ? n : undefined },
  { id: 'mine', label: 'Mine', icon: 'user', count: counts ? n + 15 : undefined },
  { id: 'all-assigned', label: 'All Assigned', icon: 'team', count: counts ? n : undefined },
  { id: 'tags', label: 'Tags', icon: 'tag' },
  { id: 'closed', label: 'Closed', icon: 'tick' },
]
// Each inbox has its own views. The ids are prefixed so two inboxes never share one.
const inboxViews = (inbox: string, counts: boolean, n: number) => views(counts, n).map((v) => ({ ...v, id: `${inbox}-${v.id}` }))

export const sampleSections = (counts: boolean, open: string[] = []): ConversationsSidebarSection[] => [
  { items: [{ id: 'my-work', label: 'My Work', icon: 'sminbox', count: counts ? '99+' : undefined }, { id: 'personal', label: 'Personal', icon: 'personal' }] },
  {
    title: 'Shared Inbox',
    items: [
      { id: 'chat', label: 'Chat inbox 01', icon: 'chatinbox', views: inboxViews('chat', counts, 9), defaultExpanded: open.includes('chat') },
      { id: 'slack', label: 'Slack', icon: 'slack', views: inboxViews('slack', counts, 4), defaultExpanded: open.includes('slack') },
      { id: 'voice', label: 'Voice', icon: 'voice', views: inboxViews('voice', counts, 12), defaultExpanded: open.includes('voice') },
      { id: 'email', label: 'Email', icon: 'mailbox', views: inboxViews('email', counts, 30), defaultExpanded: open.includes('email') },
    ],
  },
  {
    title: 'More',
    items: [{ id: 'sent', label: 'Sent', icon: 'send' }, { id: 'drafts', label: 'Drafts', icon: 'document' }, { id: 'spam', label: 'Spam', icon: 'spam' }, { id: 'all-mail', label: 'All mail', icon: 'allmails' }],
  },
]
export const sampleIds = sampleSections(true).flatMap((s) => s.items.flatMap((i) => [i.id, ...(i.views?.map((v) => v.id) ?? [])]))

