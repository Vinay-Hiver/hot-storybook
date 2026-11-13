import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatConversation } from './ChatConversation'
import type { ChatThreadItem } from './ChatConversation'
import { nowLabel, scheduleUserReply } from './simulatedReply'

const start: ChatThreadItem[] = [
  { id: '1', kind: 'message', from: 'user', text: 'The chat widget is not loading on mobile', time: 'Jul 23, 10:01 AM' },
  { id: '2', kind: 'message', from: 'agent', agentName: 'Michael Scott', text: 'Sure, happy to help with that!', time: 'Jul 23, 10:02 AM' },
]

const meta = {
  title: 'Conversation Views/Chat',
  component: ChatConversation,
  parameters: { layout: 'centered' },
  args: { name: 'Priya Nair', items: start, channel: 'chat' },
  argTypes: { channel: { control: false }, items: { control: false }, onSend: { control: false }, avatarColor: { control: 'select', options: ['lightBlue', 'red', 'orange', 'yellow', 'green', 'purple', 'violet', 'grey'] } },
} satisfies Meta<typeof ChatConversation>

export default meta
type Story = StoryObj<typeof meta>

/** A Chat conversation you can reply in. Type a reply and press Enter or Send: it joins the thread as a message from the agent. */
export const Playground: Story = {
  render: function Render(args) {
    const [items, setItems] = useState(start)
    return (
      <div style={{ width: 889, height: 700 }}>
        <ChatConversation
          {...args}
          items={items}
          onSend={(text) => {
            setItems((prev) => [...prev, { id: String(prev.length + 1), kind: 'message', from: 'agent', agentName: 'Michael Scott', text, time: nowLabel() }])
            scheduleUserReply((reply) => setItems((prev) => [...prev, reply]))
          }}
        />
      </div>
    )
  },
}
