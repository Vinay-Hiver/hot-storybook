import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
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

const note: React.CSSProperties = { font: 'var(--fontWeightRegular) 14px/20px var(--fontFamily)', color: 'var(--slateTextSubtle)' }

/** The home page: Main nav, Conversations sidebar, a flexible content area and the Right panel. */
export const Playground: StoryObj = {
  render: function Render() {
    const [navValue, setNavValue] = useState('conversations')
    return (
      <div style={{ height: '100vh' }}>
        <PageLayout
          variant="home"
          nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value={navValue} onChange={setNavValue} user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
          sidebar={<ConversationsSidebar sections={sampleSections(true, ['chat'])} value="chat-unassigned" />}
          rightPanel={<ExampleRightPanel />}
        >
          <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 24, textAlign: 'center' }}>
            <div style={{ font: 'var(--fontWeightMedium) 16px/24px var(--fontFamily)', color: 'var(--slateTextBody)', marginBottom: 4 }}>Content</div>
            <div style={note}>This area takes all the space that is left, so it grows and shrinks with the browser.</div>
          </div>
        </PageLayout>
      </div>
    )
  },
}
