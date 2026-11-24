import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlackConversation } from './SlackConversation'
import { addReaction, agentMessage, deleteMessage, removeReaction, scheduleSlackReply } from './slackThread'
import type { SlackThreadItem } from './slackThread'
import { sampleSlackThreads } from './sampleData'

const meta = {
  title: 'Conversation Views/Slack',
  component: SlackConversation,
  parameters: { layout: 'centered' },
  args: { name: 'Kavya Reddy', channelName: 'support', items: sampleSlackThreads['slack-1'] },
  argTypes: { items: { control: false }, onSend: { control: false }, onAddReaction: { control: false }, onRemoveReaction: { control: false }, onDelete: { control: false }, avatarColor: { control: 'select', options: ['lightBlue', 'red', 'orange', 'yellow', 'green', 'purple', 'violet', 'grey'] } },
} satisfies Meta<typeof SlackConversation>

export default meta
type Story = StoryObj<typeof meta>

/** A Slack conversation you can reply in. Type a reply and press Enter or Send; the customer answers a moment later. Point at a message to add a reaction, or delete your own. */
export const Playground: Story = {
  render: function Render(args) {
    const [items, setItems] = useState<SlackThreadItem[]>(sampleSlackThreads['slack-1'])
    return (
      <div style={{ width: 889, height: 700 }}>
        <SlackConversation
          {...args}
          items={items}
          onSend={(text) => {
            setItems((prev) => [...prev, { ...agentMessage(text) }])
            scheduleSlackReply((reply) => setItems((prev) => [...prev, reply]))
          }}
          onAddReaction={(id, emoji) => setItems((prev) => addReaction(prev, id, emoji))}
          onRemoveReaction={(id, emoji) => setItems((prev) => removeReaction(prev, id, emoji))}
          onDelete={(id) => setItems((prev) => deleteMessage(prev, id))}
        />
      </div>
    )
  },
}
