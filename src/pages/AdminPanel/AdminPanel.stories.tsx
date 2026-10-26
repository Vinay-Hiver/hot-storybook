import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdminPanelPage } from './AdminPanelPage'
import type { AdminPanelSection } from './AdminPanelPage'

const meta = {
  title: 'Pages/Admin panel',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta

/** The admin panel: Main nav, Admin sidebar, Sub-nav and the page content. Press Shared Inbox, Schedule or Settings in the Admin sidebar to switch. */
export const Playground: StoryObj<{ section: AdminPanelSection }> = {
  args: { section: 'shared-inbox' },
  argTypes: { section: { control: 'inline-radio', options: ['shared-inbox', 'schedule', 'settings'], description: 'Which Admin sidebar item starts selected' } },
  render: ({ section }) => <div style={{ height: '100vh' }}><AdminPanelPage key={section} section={section} /></div>,
}
