import type { Meta, StoryObj } from '@storybook/react-vite'
import { SharedInboxesPage } from '../SharedInboxes'

const meta = {
  title: 'Pages/Admin panel',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

/** The admin panel: Main nav, Admin sidebar, Sub-nav and the page content. It shows Shared Inbox > Email inboxes. */
export const Playground: StoryObj = {
  render: () => <div style={{ height: '100vh' }}><SharedInboxesPage channel="email" /></div>,
}
