import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { AvatarColor } from '../../components/Avatar'
import type { ConversationChannel } from '../../components/ConversationCard'
import { ChatConversation } from '../../patterns/ChatConversation'
import type { ChatThreadItem } from '../../patterns/ChatConversation'
import { sampleChatThreads, sampleWhatsAppThreads } from '../../patterns/ChatConversation/sampleData'
import { ConversationList } from '../../patterns/ConversationList'
import { sampleConversations } from '../../patterns/ConversationList/sampleData'
import { ConversationsSidebar } from '../../patterns/ConversationsSidebar'
import { sampleSections } from '../../patterns/ConversationsSidebar/sampleData'
import { MainNav } from '../../patterns/MainNav'
import { navSampleFooterItems, navSampleItems, navSampleUserMenu } from '../../patterns/MainNav/sampleData'
import { PageLayout } from '../../patterns/PageLayout'
import { ExampleRightPanel } from '../../patterns/RightPanel/sampleData'

const meta = {
  title: 'Pages/Home page',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

const channels = Object.keys(sampleConversations) as ConversationChannel[]
const avatarColors: AvatarColor[] = ['violet', 'lightBlue', 'green', 'orange', 'purple', 'red', 'yellow', 'grey']
const sentTime = () => new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).replace(' at', ',')

/** The home page: Main nav, Conversations sidebar, the Conversation list for the chosen view, and the Right panel. Chat and WhatsApp conversations open next to the list; the other channels come later. */
export const Playground: StoryObj = {
  render: function Render() {
    const [navValue, setNavValue] = useState('conversations')
    const [view, setView] = useState('chat-unassigned')
    const [selected, setSelected] = useState<string | undefined>(sampleConversations.chat[0].id)
    const [threads, setThreads] = useState<Record<string, ChatThreadItem[]>>({ ...sampleChatThreads, ...sampleWhatsAppThreads })
    const sections = useMemo(() => sampleSections(true, ['chat']), [])
    // Going to a view of a shared inbox selects the first conversation in it. Only Chat opens it; the other channels have no conversation view yet.
    const go = (id: string) => {
      setView(id)
      const channel = id.split('-')[0] as ConversationChannel
      setSelected(channels.includes(channel) && !/-(tags|allViews)$/.test(id) ? sampleConversations[channel][0].id : undefined)
    }
    // A view of a shared inbox, found from the sidebar's own data. Tags and All Views show no list.
    const current = sections
      .flatMap((sec) => sec.items)
      .flatMap((item) => (item.views ?? []).map((v) => ({ channel: item.id, view: v })))
      .find((x) => x.view.id === view && channels.includes(x.channel as ConversationChannel) && !/-(tags|allViews)$/.test(x.view.id))
    const openChannel = current?.channel === 'chat' || current?.channel === 'whatsapp' ? current.channel : undefined
    const selectedConv = openChannel ? sampleConversations[openChannel].find((c) => c.id === selected) : undefined
    return (
      <div style={{ height: '100vh' }}>
        <PageLayout
          variant="home"
          nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value={navValue} onChange={setNavValue} user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
          sidebar={<ConversationsSidebar sections={sections} value={view}
            onChange={go}
            // Opening an inbox lands on its first view.
            onExpandedChange={(id, open) => { const first = sections.flatMap((sec) => sec.items).find((i) => i.id === id)?.views?.[0]; if (open && first) go(first.id) }}
          />}
          rightPanel={<ExampleRightPanel />}
        >
          {current && (
            <div style={{ display: 'flex', height: '100%' }}>
              <ConversationList
                title={current.view.label}
                channel={current.channel as ConversationChannel}
                conversations={sampleConversations[current.channel as ConversationChannel]}
                selectedId={selected}
                onSelect={setSelected}
              />
              {/* Chat and WhatsApp conversations open. The other channels come later. */}
              {openChannel && selectedConv && selected && (
                <ChatConversation
                  key={selected}
                  channel={openChannel}
                  name={selectedConv.name}
                  avatarColor={avatarColors[sampleConversations[openChannel].findIndex((c) => c.id === selected) % avatarColors.length]}
                  items={threads[selected] ?? []}
                  onSend={(text) => setThreads((prev) => ({ ...prev, [selected]: [...(prev[selected] ?? []), { id: String((prev[selected]?.length ?? 0) + 1), kind: 'message', from: 'agent', agentName: 'Perry', text, time: sentTime(), status: openChannel === 'whatsapp' ? 'sent' : undefined }] }))}
                />
              )}
            </div>
          )}
        </PageLayout>
      </div>
    )
  },
}
