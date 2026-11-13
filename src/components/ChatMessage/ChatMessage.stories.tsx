import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatMessage } from './ChatMessage'

const meta = {
  title: 'Components/Chat message',
  component: ChatMessage,
  parameters: { layout: 'centered' },
  args: { from: 'user', text: 'The chat widget is not loading on mobile', time: 'Jul 23, 10:01 AM', agentName: 'Michael Scott' },
  argTypes: {
    from: { control: 'inline-radio', options: ['user', 'agent'], description: 'Who sent the message' },
    agentName: { control: 'text', name: 'agent name', description: 'The name before the time', if: { arg: 'from', eq: 'agent' } },
  },
  decorators: [(Story) => <div style={{ width: 480, display: 'flex', flexDirection: 'column' }}><Story /></div>],
} satisfies Meta<typeof ChatMessage>

export default meta
type Story = StoryObj<typeof meta>

/** One message you can change from the Controls panel. */
export const Playground: Story = {}

// The stories below feed the Docs page and are hidden from the sidebar.
export const Senders: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 480 }}>
      <ChatMessage from="user" text="The chat widget is not loading on mobile" time="Jul 23, 10:01 AM" />
      <ChatMessage from="agent" agentName="Michael Scott" text="Sure, happy to help with that!" time="Jul 23, 10:02 AM" />
    </div>
  ),
}
