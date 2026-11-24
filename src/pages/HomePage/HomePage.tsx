import { useMemo, useState } from 'react'
import type { AvatarColor } from '../../components/Avatar'
import type { ConversationChannel } from '../../components/ConversationCard'
import type { IconName } from '../../icons/iconData'
import { ChatConversation } from '../../patterns/ChatConversation'
import type { ChatThreadItem } from '../../patterns/ChatConversation'
import { nowLabel, scheduleUserReply } from '../../patterns/ChatConversation/simulatedReply'
import { ConversationList } from '../../patterns/ConversationList'
import { withLatest } from '../../patterns/ConversationList/latest'
import type { LatestMessage } from '../../patterns/ConversationList/latest'
import type { ConversationListItem } from '../../patterns/ConversationList/sampleData'
import { ConversationsSidebar } from '../../patterns/ConversationsSidebar'
import type { ConversationsSidebarSection } from '../../patterns/ConversationsSidebar'
import { channelViews, viewLibrary } from '../../patterns/ConversationsSidebar/data'
import { sampleSections } from '../../patterns/ConversationsSidebar/sampleData'
import { EmailConversation } from '../../patterns/EmailConversation'
import type { EmailThreadMessage } from '../../patterns/EmailConversation'
import { agentEmail, emailAgentAddress, scheduleEmailReply } from '../../patterns/EmailConversation/emailThread'
import { MainNav } from '../../patterns/MainNav'
import { navSampleFooterItems, navSampleItems, navSampleUserMenu } from '../../patterns/MainNav/sampleData'
import { PageLayout } from '../../patterns/PageLayout'
import { ExampleRightPanel } from '../../patterns/RightPanel/sampleData'
import { SlackConversation } from '../../patterns/SlackConversation'
import type { SlackThreadItem } from '../../patterns/SlackConversation'
import { addReaction, agentMessage, deleteMessage, removeReaction, scheduleSlackReply } from '../../patterns/SlackConversation/slackThread'
import type { TagOption } from '../../patterns/RightPanel'
import { TagsSidebar } from '../../patterns/TagsSidebar'
import type { TagsSidebarTag } from '../../patterns/TagsSidebar'
import { EmptyState } from '../../patterns/EmptyState'
import { BulkActionsPanel } from '../../patterns/BulkActionsPanel'
import { AllViewsSidebar } from '../../patterns/AllViewsSidebar'
import type { AllViewsSidebarItem } from '../../patterns/AllViewsSidebar'
import { homeData } from './homeData'
import './HomePage.css'
import type { HomeConversation, HomeData, HomeInbox } from './homeData'

const avatarColors: AvatarColor[] = ['violet', 'lightBlue', 'green', 'orange', 'purple', 'red', 'yellow', 'grey']
const channelIcons: Record<ConversationChannel, IconName> = { chat: 'chatinbox', slack: 'slack', whatsapp: 'whatsapp', sms: 'sms', email: 'mailbox', voice: 'voice' }
/** An inbox's id in the sidebar: its own `id`, else its channel. */
const keyOf = (i: HomeInbox) => i.id ?? i.channel
/** The tags of an inbox with how many of its conversations have each. */
const tagsOf = (inbox: HomeInbox): TagsSidebarTag[] => {
  const found = new Map<string, TagsSidebarTag>()
  inbox.conversations.forEach((c) => (c.tags ?? []).forEach((t) => { const f = found.get(t.label); if (f) f.count += 1; else found.set(t.label, { id: t.label, label: t.label, color: t.color, count: 1 }) }))
  return [...found.values()]
}
/** The views of an Email inbox for the All Views sidebar: the four in its sidebar as favourites, then the rest. Counts follow the sidebar's rule (its conversations); views the inbox does not have yet show 0. */
const allViewsOf = (inbox: HomeInbox, favIds?: string[]): { favorites: AllViewsSidebarItem[]; others: AllViewsSidebarItem[] } => {
  const item = (key: string, icon?: IconName, count = 0): AllViewsSidebarItem => ({ id: key, label: viewLibrary[key]?.label ?? key, icon: icon ?? viewLibrary[key].icon, count })
  const n = inbox.conversations.length
  const list = [item('mine', undefined, n), item('unassigned', undefined, n), item('team', undefined, n), item('tickets', undefined, n), item('pending', 'pendingstatus'), item('closed'), { id: 'overdue', label: 'Overdue', icon: 'timer' as IconName, count: 0 }, { id: 'dueSoon', label: 'Due Soon', icon: 'clock' as IconName, count: 0 }]
  const ids = favIds ?? list.slice(0, 4).map((v) => v.id)
  return { favorites: ids.map((id) => list.find((v) => v.id === id)).filter((v): v is AllViewsSidebarItem => !!v), others: list.filter((v) => !ids.includes(v.id)) }
}
const hasNoList = (viewId: string) => /-(tags|allViews)$/.test(viewId)

type ChatChannel = 'chat' | 'whatsapp' | 'sms'
const isChat = (c: ConversationChannel): c is ChatChannel => c === 'chat' || c === 'whatsapp' || c === 'sms'

/** Turns the data of each conversation into the thread its conversation view shows. */
const chatThread = (c: HomeConversation, channel: ConversationChannel): ChatThreadItem[] =>
  c.messages.map((m, i) => ({ id: String(i + 1), kind: 'message', from: m.from === 'customer' ? 'user' : 'agent', text: m.text, time: m.time, agentName: m.from === 'agent' ? 'Aarav Mehta' : undefined, status: channel === 'whatsapp' && m.from === 'agent' ? m.status ?? 'sent' : undefined }))
const slackThread = (c: HomeConversation): SlackThreadItem[] => c.messages.map((m, i) => ({ id: String(i + 1), from: m.from === 'customer' ? 'user' : 'agent', text: m.text, time: m.time, reactions: m.reactions }))
const customerAddress = (c: HomeConversation) => c.email ?? `${c.name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`
const emailThread = (c: HomeConversation, color: AvatarColor): EmailThreadMessage[] => c.messages.map((m, i) => ({ id: String(i + 1), email: m.from === 'customer' ? customerAddress(c) : emailAgentAddress, avatarColor: m.from === 'customer' ? color : 'lightBlue', time: m.time, body: m.text }))

/** The card of a conversation in the list. */
const toListItem = (c: HomeConversation): ConversationListItem => ({ id: c.id, name: c.name, date: c.date, unread: c.unread, sla: c.sla, tags: c.tags, status: c.status, moreCount: c.moreCount, callDirection: c.call })

/** The Shared Inbox part of the sidebar, built from the inboxes: each inbox gets its channel's views, counted by its conversations. */
function sharedInboxItems(inboxes: HomeInbox[], favEdits: Record<string, string[]>) {
  return inboxes.map((inbox) => {
    const key = keyOf(inbox)
    const libraryView = (k: string) => { const v = viewLibrary[k]; return { id: `${key}-${v.id}`, label: v.label, icon: v.icon, count: v.hasCount ? inbox.conversations.length : undefined } }
    // An Email inbox lists only its favourite views (starred in All Views), then Tags and All Views. The other channels keep their own views.
    if (inbox.channel === 'email') {
      const favs = allViewsOf(inbox, favEdits[key]).favorites
      return { id: key, label: inbox.label, icon: channelIcons[inbox.channel], views: [...favs.map((v) => ({ id: `${key}-${v.id}`, label: v.label, icon: v.icon, count: v.count })), libraryView('tags'), libraryView('allViews')] }
    }
    return { id: key, label: inbox.label, icon: channelIcons[inbox.channel], views: channelViews[inbox.channel].map(libraryView) }
  })
}

/**
 * The Home page of Hiver: Main nav, Conversations sidebar, the Conversation list of the chosen view, the conversation next to it, and the Right panel.
 * Everything it shows comes from `data` (see homeData.ts): the inboxes (channels) in the sidebar, their conversations and messages, and the custom fields.
 * Chat, WhatsApp, SMS, Slack and Email conversations can be read and answered (the customer replies a moment later). Voice shows its list only.
 * Tags and All Views (Email only) open their own sidebar over the Conversations sidebar (back arrow returns); the conversation view stays as it is while they are open.
 */
export function HomePage({ data = homeData, onNavChange }: { data?: HomeData; /** Called with the id of the Main nav item that was pressed (for example `admin`), so a page above can switch to it. */ onNavChange?: (id: string) => void }) {
  const { inboxes, customFields } = data
  const first = inboxes[0]
  const [navValue, setNavValue] = useState('conversations')
  const [view, setView] = useState(first ? `${keyOf(first)}-${channelViews[first.channel][0]}` : '')
  // The icon at the top of the Conversation list hides the Conversations sidebar. The Main nav stays.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selected, setSelected] = useState<string | undefined>(first?.conversations[0]?.id)
  const [threads, setThreads] = useState<Record<string, ChatThreadItem[]>>(() => Object.fromEntries(inboxes.filter((i) => isChat(i.channel)).flatMap((i) => i.conversations.map((c) => [c.id, chatThread(c, i.channel)]))))
  const [slackThreads, setSlackThreads] = useState<Record<string, SlackThreadItem[]>>(() => Object.fromEntries(inboxes.filter((i) => i.channel === 'slack').flatMap((i) => i.conversations.map((c) => [c.id, slackThread(c)]))))
  const [emailThreads, setEmailThreads] = useState<Record<string, EmailThreadMessage[]>>(() => Object.fromEntries(inboxes.filter((i) => i.channel === 'email').flatMap((i) => i.conversations.map((c, n) => [c.id, emailThread(c, avatarColors[n % avatarColors.length])]))))

  // The favourite views of each Email inbox, once changed in All Views (by inbox id; before that, the four defaults).
  const [favEdits, setFavEdits] = useState<Record<string, string[]>>({})
  const sections = useMemo<ConversationsSidebarSection[]>(() => {
    const base = sampleSections(true, first ? [first.channel] : [])
    return base.map((sec) => (sec.title === 'Shared Inbox' ? { ...sec, items: sharedInboxItems(inboxes, favEdits).map((it) => ({ ...it, defaultExpanded: it.id === (first && keyOf(first)) })) } : sec))
  }, [inboxes, first, favEdits])

  const inboxOf = (id: string) => inboxes.find((i) => keyOf(i) === id)
  // The inbox a view id belongs to (the longest matching id wins, so `email-2` beats `email`).
  const inboxOfView = (viewId: string) => [...inboxes].sort((a, b) => keyOf(b).length - keyOf(a).length).find((i) => viewId.startsWith(`${keyOf(i)}-`))
  // Going to a view selects the first conversation in it (Tags and All Views show no list).
  // Tags and All Views only change the sidebar: the conversation view keeps showing the last view that has a list.
  const [listView, setListView] = useState(view)
  const go = (id: string) => {
    setView(id)
    if (!hasNoList(id)) setListView(id)
    if (id.endsWith('-allViews')) { const t = inboxOfView(id); if (t) { setAllViewsKey(keyOf(t)); setAllViewsValue(undefined) } }
    if (id.endsWith('-tags')) { const t = inboxOfView(id); if (t) { setTagsKey(keyOf(t)); setTagValue(undefined) } }
    const inbox = inboxOfView(id)
    if (!hasNoList(id)) setSelected(inbox ? inbox.conversations[0]?.id : undefined)
  }
  // Tags opens the Tags sidebar over the Conversations sidebar. The inbox stays remembered so the panel keeps its content while it slides out.
  const [tagsKey, setTagsKey] = useState<string>()
  const [tagValue, setTagValue] = useState<string>()
  // Only an inbox has a Tags sidebar (Personal's Tags is not an inbox's, so it keeps the Conversations sidebar).
  const tagsOpen = view.endsWith('-tags') && !!inboxOfView(view)
  // All Views (Email inboxes only) opens the same way.
  const [allViewsKey, setAllViewsKey] = useState<string>()
  const [allViewsValue, setAllViewsValue] = useState<string>()
  const allViewsOpen = view.endsWith('-allViews') && !!inboxOfView(view)
  const tagsInbox = tagsOpen ? inboxOfView(view) : inboxes.find((i) => keyOf(i) === tagsKey)
  const allViewsInbox = allViewsOpen ? inboxOfView(view) : inboxes.find((i) => keyOf(i) === allViewsKey)
  // The second line of each card is the latest message of its thread, as it stands now (a message you send shows with the reply arrow).
  const latestFor = (id: string): LatestMessage | undefined => {
    const chat = threads[id]?.filter((m) => m.kind === 'message')
    const lastChat = chat?.[chat.length - 1]
    if (lastChat && lastChat.kind === 'message') return { text: lastChat.text, sent: lastChat.from === 'agent' }
    const slack = slackThreads[id]
    if (slack?.length) return { text: slack[slack.length - 1].text, sent: slack[slack.length - 1].from === 'agent' }
    const email = emailThreads[id]
    if (email?.length) return { text: email[email.length - 1].body, sent: email[email.length - 1].email === emailAgentAddress }
    return undefined
  }

  // The inbox and view being shown, found from the sidebar's own data.
  // The list shows the inbox of the current view. Its title comes from the sidebar; a view that is no longer a favourite keeps showing under its own name until another is chosen.
  const shownViewId = hasNoList(view) ? listView : view
  const shownInbox = inboxOfView(shownViewId)
  const shownLabel = sections.flatMap((sec) => sec.items).flatMap((item) => item.views ?? []).find((v) => v.id === shownViewId)?.label ?? (shownInbox && [...allViewsOf(shownInbox).favorites, ...allViewsOf(shownInbox).others].find((v) => `${keyOf(shownInbox)}-${v.id}` === shownViewId)?.label) ?? 'Conversations'
  const currentView = shownInbox ? { inbox: shownInbox, view: { id: shownViewId, label: shownLabel } } : undefined
  const inbox = currentView?.inbox
  const channel = inbox?.channel
  const selectedConv = inbox?.conversations.find((c) => c.id === selected)
  const selectedIndex = inbox && selected ? inbox.conversations.findIndex((c) => c.id === selected) : 0
  const color = avatarColors[Math.max(selectedIndex, 0) % avatarColors.length]

  // As soon as one conversation is ticked in the list, the bulk actions take the place of the conversation and the right panel.
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const bulk = checkedIds.length > 0
  // When the list shows nothing (a tab or filter with no conversations), the area beside it shows an empty state instead of a conversation and the right panel.
  const [shownIds, setShownIds] = useState<string[]>()
  const listEmpty = shownIds?.length === 0

  // Tags are edited in the Tags field of the right panel, per conversation. The cards and the Tags sidebar follow them.
  const [tagEdits, setTagEdits] = useState<Record<string, string[]>>({})
  const tagOptions = useMemo<TagOption[]>(() => {
    const found = new Map<string, TagOption>()
    inboxes.forEach((i) => i.conversations.forEach((c) => (c.tags ?? []).forEach((t) => { if (!found.has(t.label)) found.set(t.label, { value: t.label, label: t.label, color: t.color }) })))
    return [...found.values()]
  }, [inboxes])
  const tagValuesOf = (c: HomeConversation) => tagEdits[c.id] ?? (c.tags ?? []).map((t) => t.label)
  // In the Tags sidebar, choosing a tag titles the list with its name and keeps only the conversations that have it. Choosing it again clears the filter.
  const activeTag = tagsOpen ? tagValue : undefined
  const chooseTag = (id: string) => {
    const next = tagValue === id ? undefined : id
    setTagValue(next)
    if (!tagsInbox) return
    // The list is of the inbox the tags belong to.
    if (inbox !== tagsInbox) setListView(`${keyOf(tagsInbox)}-${channelViews[tagsInbox.channel][0]}`)
    setSelected(tagsInbox.conversations.find((c) => !next || tagValuesOf(c).includes(next))?.id)
  }
  const withTagEdits = (c: HomeConversation): HomeConversation => (tagEdits[c.id] ? { ...c, moreCount: undefined, tags: tagEdits[c.id].map((v) => ({ label: v, color: tagOptions.find((o) => o.value === v)?.color })) } : c)

  return (
    <div style={{ height: '100vh' }}>
      <PageLayout
        variant="home"
        sidebarCollapsed={sidebarCollapsed}
        nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value={navValue} onChange={(id) => { setNavValue(id); onNavChange?.(id) }} user={{ initial: 'A', name: 'Aarav Mehta' }} userMenu={navSampleUserMenu} />}
        sidebar={
          <div className="hot-home-sidebars">
            <div className="hot-home-sidebars__base">
            <ConversationsSidebar sections={sections} value={view}
              onChange={go}
              // Opening an inbox lands on its first view.
              onExpandedChange={(id, open) => { const firstView = sections.flatMap((sec) => sec.items).find((i) => i.id === id)?.views?.[0]; if (open && firstView) go(firstView.id) }}
            />
            </div>
            <div className="hot-home-sidebars__tags" data-open={tagsOpen} aria-hidden={!tagsOpen || undefined}>
              {tagsInbox && <TagsSidebar subtitle={tagsInbox.label} tags={tagsOf({ ...tagsInbox, conversations: tagsInbox.conversations.map(withTagEdits) })} value={tagValue} onSelect={chooseTag} onBack={() => { setTagValue(undefined); setView(listView) }} />}
            </div>
            <div className="hot-home-sidebars__tags" data-open={allViewsOpen} aria-hidden={!allViewsOpen || undefined}>
              {allViewsInbox && <AllViewsSidebar key={keyOf(allViewsInbox)} subtitle={allViewsInbox.label} {...allViewsOf(allViewsInbox, favEdits[keyOf(allViewsInbox)])} value={allViewsValue} onFavoritesChange={(ids) => setFavEdits((prev) => ({ ...prev, [keyOf(allViewsInbox)]: ids }))}
                // A view the inbox has opens it (the panel slides away); the others only get highlighted.
                onSelect={(id) => { if (sections.some((sec) => sec.items.some((it) => it.views?.some((v) => v.id === `${keyOf(allViewsInbox)}-${id}`)))) go(`${keyOf(allViewsInbox)}-${id}`); else setAllViewsValue(id) }}
                onBack={() => setView(listView)} />}
            </div>
          </div>
        }
        rightPanel={bulk || listEmpty ? undefined : <ExampleRightPanel open={['contact', 'custom']} tagOptions={tagOptions} tags={selectedConv ? tagValuesOf(selectedConv) : undefined} onTagsChange={selectedConv ? (next) => setTagEdits((prev) => ({ ...prev, [selectedConv.id]: next })) : undefined} coAssignee={channel === 'email'} customFields={customFields} contact={selectedConv ? { name: selectedConv.name, email: channel === 'email' ? customerAddress(selectedConv) : selectedConv.email } : undefined} />}
      >
        {currentView && inbox && channel && (
          <div style={{ display: 'flex', height: '100%' }}>
            <ConversationList
              title={activeTag ?? currentView.view.label}
              channel={channel}
              conversations={withLatest(inbox.conversations.filter((c) => !activeTag || tagValuesOf(c).includes(activeTag)).map((c) => toListItem(withTagEdits(c))), latestFor)}
              selectedId={selected}
              onSelect={setSelected}
              checkedIds={checkedIds}
              onCheckedIdsChange={setCheckedIds}
              statusTabs={!!activeTag}
              onShownIdsChange={setShownIds}
              onIconClick={() => setSidebarCollapsed((c) => !c)}
              iconLabel={sidebarCollapsed ? 'Show the sidebar' : 'Hide the sidebar'}
            />
            {listEmpty && <div style={{ flex: 1, minWidth: 0, background: 'var(--slateSurfaceSubtle)' }}><EmptyState icon="email" title="No conversations found" description="Take a chill pill!" /></div>}
            {!listEmpty && bulk && <BulkActionsPanel count={checkedIds.length} onCancel={() => setCheckedIds([])} />}
            {!bulk && !listEmpty && channel === 'email' && selectedConv && selected && (
              <EmailConversation
                key={selected}
                subject={selectedConv.subject ?? 'No subject'}
                messages={emailThreads[selected] ?? []}
                onSend={(text) => {
                  const id = selected
                  setEmailThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), agentEmail(text)] }))
                  scheduleEmailReply(customerAddress(selectedConv), color, (reply) => setEmailThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), reply] })))
                }}
              />
            )}
            {!bulk && !listEmpty && channel === 'slack' && selectedConv && selected && (
              <SlackConversation
                key={selected}
                name={selectedConv.name}
                channelName={selectedConv.slackChannel ?? 'support'}
                avatarColor={color}
                items={slackThreads[selected] ?? []}
                onSend={(text) => {
                  const id = selected
                  setSlackThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), agentMessage(text)] }))
                  scheduleSlackReply((reply) => setSlackThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), reply] })))
                }}
                onAddReaction={(mid, emoji) => setSlackThreads((prev) => ({ ...prev, [selected]: addReaction(prev[selected] ?? [], mid, emoji) }))}
                onRemoveReaction={(mid, emoji) => setSlackThreads((prev) => ({ ...prev, [selected]: removeReaction(prev[selected] ?? [], mid, emoji) }))}
                onDelete={(mid) => setSlackThreads((prev) => ({ ...prev, [selected]: deleteMessage(prev[selected] ?? [], mid) }))}
              />
            )}
            {!bulk && !listEmpty && isChat(channel) && selectedConv && selected && (
              <ChatConversation
                key={selected}
                channel={channel}
                name={selectedConv.name}
                avatarColor={color}
                items={threads[selected] ?? []}
                onSend={(text) => {
                  const id = selected
                  setThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), { id: String((prev[id]?.length ?? 0) + 1), kind: 'message', from: 'agent', agentName: 'Aarav Mehta', text, time: nowLabel(), status: channel === 'whatsapp' ? 'sent' : undefined }] }))
                  // The customer answers a moment later, to mimic a conversation.
                  scheduleUserReply((reply) => setThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), reply] })))
                }}
              />
            )}
          </div>
        )}
      </PageLayout>
    </div>
  )
}
