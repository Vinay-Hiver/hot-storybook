import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConversationList } from './ConversationList'
import { sampleConversations } from './sampleData'
import type { ConversationChannel } from '../../components/ConversationCard'

const channels: ConversationChannel[] = ['email', 'slack', 'chat', 'voice', 'sms', 'whatsapp']

const meta = {
  title: 'Patterns/Conversation list',
  component: ConversationList,
  parameters: { layout: 'centered' },
  args: { title: 'Unassigned', channel: 'chat', conversations: sampleConversations.chat },
  argTypes: {
    channel: { control: 'select', options: channels, description: 'Each channel has its own list of dummy conversations' },
    icon: { control: false },
    conversations: { control: false },
    selectedId: { control: false },
    onSelect: { control: false },
  },
} satisfies Meta<typeof ConversationList>

export default meta
type Story = StoryObj<typeof meta>

/** A list you can change from the Controls panel. Pick a channel to see its conversations, and click a card to select it. */
export const Playground: Story = {
  render: function Render({ channel, ...args }) {
    const [selected, setSelected] = useState<string | undefined>(undefined)
    useEffect(() => setSelected(undefined), [channel])
    return (
      <div style={{ height: 640 }}>
        <ConversationList {...args} channel={channel} conversations={sampleConversations[channel]} selectedId={selected} onSelect={setSelected} />
      </div>
    )
  },
}
