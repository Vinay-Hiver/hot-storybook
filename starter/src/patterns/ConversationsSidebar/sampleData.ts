import type { ConversationsSidebarSection, ConversationsSidebarView } from './ConversationsSidebar'
import { channelViews, myWorkViews, personalViews, viewLibrary } from './data'
import type { ViewChannelId } from './data'
import { conversationCounts } from '../ConversationList/sampleData'

/** Example inboxes and views, shared by the Conversations sidebar and Page layout stories. */
// A personal view that shows a count has 1 conversation. An inbox view that shows a count has as many as the channel's dummy list in the Conversation list.
const conversationsPerView = 1

/** A list of views from the library, in the given order. The ids are prefixed so two inboxes never share one. */
const viewsFor = (prefix: string, keys: string[], counts: boolean, perView = conversationsPerView): ConversationsSidebarView[] =>
  keys.map((key) => {
    const v = viewLibrary[key]
    return { id: `${prefix}-${v.id}`, label: v.label, icon: v.icon, count: counts && v.hasCount ? perView : undefined }
  })

const inboxViews = (channel: ViewChannelId, counts: boolean): ConversationsSidebarView[] => viewsFor(channel, channelViews[channel], counts, conversationCounts[channel])

// Example counts for the My Work queues (Figma shows 5 and 99+).
const myWorkCounts: Record<string, number> = { liveQueue: 5, standardQueue: 150 }

export const sampleSections = (counts: boolean, open: string[] = []): ConversationsSidebarSection[] => [
  { items: [{ id: 'my-work', label: 'My Work', icon: 'sminbox', count: counts ? '99+' : undefined, views: myWorkViews.map((v) => ({ id: `my-work-${v.id}`, label: v.label, icon: v.icon, count: counts ? myWorkCounts[v.id] : undefined })), defaultExpanded: open.includes('my-work'), hoverIcon: 'settings3' }, { id: 'personal', label: 'Personal', icon: 'personal', views: viewsFor('personal', personalViews, counts), defaultExpanded: open.includes('personal') }] },
  {
    title: 'Shared Inbox',
    items: [
      { id: 'chat', label: 'Website Chat', icon: 'chatinbox', views: inboxViews('chat', counts), defaultExpanded: open.includes('chat') },
      { id: 'slack', label: 'Slack', icon: 'slack', views: inboxViews('slack', counts), defaultExpanded: open.includes('slack') },
      { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp', views: inboxViews('whatsapp', counts), defaultExpanded: open.includes('whatsapp') },
      { id: 'sms', label: 'SMS', icon: 'sms', views: inboxViews('sms', counts), defaultExpanded: open.includes('sms') },
      { id: 'email', label: 'Email', icon: 'mailbox', views: inboxViews('email', counts), defaultExpanded: open.includes('email') },
      { id: 'voice', label: 'Voice', icon: 'voice', views: inboxViews('voice', counts), defaultExpanded: open.includes('voice') },
    ],
  },
  {
    title: 'More',
    items: [{ id: 'sent', label: 'Sent', icon: 'send' }, { id: 'drafts', label: 'Drafts', icon: 'document' }, { id: 'spam', label: 'Spam', icon: 'spam' }, { id: 'all-mail', label: 'All mail', icon: 'allmails' }],
  },
]
export const sampleIds = sampleSections(true).flatMap((s) => s.items.flatMap((i) => [i.id, ...(i.views?.map((v) => v.id) ?? [])]))

