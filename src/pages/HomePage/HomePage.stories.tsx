import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ConversationChannel } from '../../components/ConversationCard'
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

/** The home page: Main nav, Conversations sidebar, the Conversation list for the chosen view, and the Right panel. Opening a conversation is not built yet. */
export const Playground: StoryObj = {
  render: function Render() {
    const [navValue, setNavValue] = useState('conversations')
    const [view, setView] = useState('chat-unassigned')
    const [selected, setSelected] = useState<string | undefined>(undefined)
    const sections = useMemo(() => sampleSections(true, ['chat']), [])
    // A view of a shared inbox, found from the sidebar's own data. Tags and All Views show no list.
    const current = sections
      .flatMap((sec) => sec.items)
      .flatMap((item) => (item.views ?? []).map((v) => ({ channel: item.id, view: v })))
      .find((x) => x.view.id === view && channels.includes(x.channel as ConversationChannel) && !/-(tags|allViews)$/.test(x.view.id))
    return (
      <div style={{ height: '100vh' }}>
        <PageLayout
          variant="home"
          nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value={navValue} onChange={setNavValue} user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
          sidebar={<ConversationsSidebar sections={sections} value={view} onChange={(id) => { setView(id); setSelected(undefined) }} />}
          rightPanel={<ExampleRightPanel />}
        >
          {current && (
            <ConversationList
              title={current.view.label}
              channel={current.channel as ConversationChannel}
              conversations={sampleConversations[current.channel as ConversationChannel]}
              selectedId={selected}
              onSelect={setSelected}
            />
          )}
        </PageLayout>
      </div>
    )
  },
}
