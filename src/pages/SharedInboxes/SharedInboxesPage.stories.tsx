import type { Meta, StoryObj } from '@storybook/react-vite'
import { SharedInboxesPage } from './SharedInboxesPage'
import { sharedInboxChannels } from './data'

const meta = {
  title: 'Admin panel/Shared inboxes',
  component: SharedInboxesPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SharedInboxesPage>

export default meta

const inboxIds = sharedInboxChannels.flatMap((c) => c.inboxes.map((i) => i.id))

type PlaygroundArgs = { channel: 'email' | 'slack' | 'chat' | 'whatsapp' | 'voice' | 'sms'; openInbox: string }

/** Admin panel > Shared Inbox. Pick a channel in the sub-nav to see its inboxes, hover a row for the delete icon, and press a row to open that inbox's settings. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { channel: 'email', openInbox: 'none' },
  argTypes: {
    channel: { control: 'select', options: sharedInboxChannels.map((c) => c.id), description: 'Which channel is selected in the sub-nav' },
    openInbox: { control: 'select', options: ['none', ...inboxIds], name: 'open inbox', description: 'Start with this inbox\'s settings open' },
  },
  render: ({ channel, openInbox }) => (
    <div style={{ height: '100vh' }}>
      <SharedInboxesPage key={`${channel}|${openInbox}`} channel={channel} inboxId={openInbox === 'none' ? undefined : openInbox} />
    </div>
  ),
}
