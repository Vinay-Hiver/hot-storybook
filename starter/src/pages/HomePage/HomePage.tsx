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
import { homeData } from './homeData'
import type { HomeConversation, HomeData, HomeInbox } from './homeData'

const avatarColors: AvatarColor[] = ['violet', 'lightBlue', 'green', 'orange', 'purple', 'red', 'yellow', 'grey']
const channelIcons: Record<ConversationChannel, IconName> = { chat: 'chatinbox', slack: 'slack', whatsapp: 'whatsapp', sms: 'sms', email: 'mailbox', voice: 'voice' }
const hasNoList = (viewId: string) => /-(tags|allViews)$/.test(viewId)

type ChatChannel = 'chat' | 'whatsapp' | 'sms'
const isChat = (c: ConversationChannel): c is ChatChannel => c === 'chat' || c === 'whatsapp' || c === 'sms'

/** Turns the data of each conversation into the thread its conversation view shows. */
const chatThread = (c: HomeConversation, channel: ConversationChannel): ChatThreadItem[] =>
  c.messages.map((m, i) => ({ id: String(i + 1), kind: 'message', from: m.from === 'customer' ? 'user' : 'agent', text: m.text, time: m.time, agentName: m.from === 'agent' ? 'Perry' : undefined, status: channel === 'whatsapp' && m.from === 'agent' ? m.status ?? 'sent' : undefined }))
const slackThread = (c: HomeConversation): SlackThreadItem[] => c.messages.map((m, i) => ({ id: String(i + 1), from: m.from === 'customer' ? 'user' : 'agent', text: m.text, time: m.time, reactions: m.reactions }))
const customerAddress = (c: HomeConversation) => c.email ?? `${c.name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`
const emailThread = (c: HomeConversation, color: AvatarColor): EmailThreadMessage[] => c.messages.map((m, i) => ({ id: String(i + 1), email: m.from === 'customer' ? customerAddress(c) : emailAgentAddress, avatarColor: m.from === 'customer' ? color : 'lightBlue', time: m.time, body: m.text }))

/** The card of a conversation in the list. */
const toListItem = (c: HomeConversation): ConversationListItem => ({ id: c.id, name: c.name, date: c.date, unread: c.unread, sla: c.sla, tags: c.tags, moreCount: c.moreCount, callDirection: c.call })

/** The Shared Inbox part of the sidebar, built from the inboxes: each inbox gets its channel's views, counted by its conversations. */
function sharedInboxItems(inboxes: HomeInbox[]) {
  return inboxes.map((inbox) => ({
    id: inbox.channel,
    label: inbox.label,
    icon: channelIcons[inbox.channel],
    views: channelViews[inbox.channel].map((key) => {
      const v = viewLibrary[key]
      return { id: `${inbox.channel}-${v.id}`, label: v.label, icon: v.icon, count: v.hasCount ? inbox.conversations.length : undefined }
    }),
  }))
}

/**
 * The Home page of Hiver: Main nav, Conversations sidebar, the Conversation list of the chosen view, the conversation next to it, and the Right panel.
 * Everything it shows comes from `data` (see homeData.ts): the inboxes (channels) in the sidebar, their conversations and messages, and the custom fields.
 * Chat, WhatsApp, SMS, Slack and Email conversations can be read and answered (the customer replies a moment later). Voice shows its list only.
 * Tags and All Views show no list.
 */
export function HomePage({ data = homeData, onNavChange }: { data?: HomeData; /** Called with the id of the Main nav item that was pressed (for example `admin`), so a page above can switch to it. */ onNavChange?: (id: string) => void }) {
  const { inboxes, customFields } = data
  const first = inboxes[0]
  const [navValue, setNavValue] = useState('conversations')
  const [view, setView] = useState(first ? `${first.channel}-${channelViews[first.channel][0]}` : '')
  // The icon at the top of the Conversation list hides the Conversations sidebar. The Main nav stays.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selected, setSelected] = useState<string | undefined>(first?.conversations[0]?.id)
  const [threads, setThreads] = useState<Record<string, ChatThreadItem[]>>(() => Object.fromEntries(inboxes.filter((i) => isChat(i.channel)).flatMap((i) => i.conversations.map((c) => [c.id, chatThread(c, i.channel)]))))
  const [slackThreads, setSlackThreads] = useState<Record<string, SlackThreadItem[]>>(() => Object.fromEntries(inboxes.filter((i) => i.channel === 'slack').flatMap((i) => i.conversations.map((c) => [c.id, slackThread(c)]))))
  const [emailThreads, setEmailThreads] = useState<Record<string, EmailThreadMessage[]>>(() => Object.fromEntries(inboxes.filter((i) => i.channel === 'email').flatMap((i) => i.conversations.map((c, n) => [c.id, emailThread(c, avatarColors[n % avatarColors.length])]))))

  const sections = useMemo<ConversationsSidebarSection[]>(() => {
    const base = sampleSections(true, first ? [first.channel] : [])
    return base.map((sec) => (sec.title === 'Shared Inbox' ? { ...sec, items: sharedInboxItems(inboxes).map((it) => ({ ...it, defaultExpanded: it.id === first?.channel })) } : sec))
  }, [inboxes, first])

  const inboxOf = (channel: string) => inboxes.find((i) => i.channel === channel)
  // Going to a view selects the first conversation in it (Tags and All Views show no list).
  const go = (id: string) => {
    setView(id)
    const inbox = inboxOf(id.split('-')[0])
    setSelected(inbox && !hasNoList(id) ? inbox.conversations[0]?.id : undefined)
  }
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
  const currentView = sections.flatMap((sec) => sec.items).flatMap((item) => (item.views ?? []).map((v) => ({ inbox: inboxOf(item.id), view: v }))).find((x) => x.view.id === view && x.inbox && !hasNoList(view))
  const inbox = currentView?.inbox
  const channel = inbox?.channel
  const selectedConv = inbox?.conversations.find((c) => c.id === selected)
  const selectedIndex = inbox && selected ? inbox.conversations.findIndex((c) => c.id === selected) : 0
  const color = avatarColors[Math.max(selectedIndex, 0) % avatarColors.length]

  return (
    <div style={{ height: '100vh' }}>
      <PageLayout
        variant="home"
        sidebarCollapsed={sidebarCollapsed}
        nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value={navValue} onChange={(id) => { setNavValue(id); onNavChange?.(id) }} user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
        sidebar={<ConversationsSidebar sections={sections} value={view}
          onChange={go}
          // Opening an inbox lands on its first view.
          onExpandedChange={(id, open) => { const firstView = sections.flatMap((sec) => sec.items).find((i) => i.id === id)?.views?.[0]; if (open && firstView) go(firstView.id) }}
        />}
        rightPanel={<ExampleRightPanel open={['contact', 'custom']} coAssignee={channel === 'email'} customFields={customFields} contact={selectedConv ? { name: selectedConv.name, email: channel === 'email' ? customerAddress(selectedConv) : selectedConv.email } : undefined} />}
      >
        {currentView && inbox && channel && (
          <div style={{ display: 'flex', height: '100%' }}>
            <ConversationList
              title={currentView.view.label}
              channel={channel}
              conversations={withLatest(inbox.conversations.map(toListItem), latestFor)}
              selectedId={selected}
              onSelect={setSelected}
              onIconClick={() => setSidebarCollapsed((c) => !c)}
              iconLabel={sidebarCollapsed ? 'Show the sidebar' : 'Hide the sidebar'}
            />
            {channel === 'email' && selectedConv && selected && (
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
            {channel === 'slack' && selectedConv && selected && (
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
            {isChat(channel) && selectedConv && selected && (
              <ChatConversation
                key={selected}
                channel={channel}
                name={selectedConv.name}
                avatarColor={color}
                items={threads[selected] ?? []}
                onSend={(text) => {
                  const id = selected
                  setThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), { id: String((prev[id]?.length ?? 0) + 1), kind: 'message', from: 'agent', agentName: 'Perry', text, time: nowLabel(), status: channel === 'whatsapp' ? 'sent' : undefined }] }))
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
