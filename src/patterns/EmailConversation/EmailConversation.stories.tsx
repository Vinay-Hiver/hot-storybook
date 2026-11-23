import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmailConversation } from './EmailConversation'
import { agentEmail, scheduleEmailReply } from './emailThread'
import type { EmailThreadMessage } from './emailThread'
import { sampleEmails } from './sampleData'

const sample = sampleEmails['email-1']

const meta = {
  title: 'Conversation Views/Email',
  component: EmailConversation,
  parameters: { layout: 'centered' },
  args: { subject: sample.subject, messages: sample.messages },
  argTypes: { messages: { control: false }, onSend: { control: false } },
} satisfies Meta<typeof EmailConversation>

export default meta
type Story = StoryObj<typeof meta>

/** An email conversation you can reply in. Press Reply on a message, write something and press Send: it joins the thread, and the customer answers a moment later. */
export const Playground: Story = {
  render: function Render(args) {
    const [messages, setMessages] = useState<EmailThreadMessage[]>(sample.messages)
    return (
      <div style={{ width: 889, height: 720 }}>
        <EmailConversation
          {...args}
          messages={messages}
          onSend={(text) => {
            setMessages((prev) => [...prev, agentEmail(text)])
            scheduleEmailReply(sample.customerEmail, sample.customerColor, (reply) => setMessages((prev) => [...prev, reply]))
          }}
        />
      </div>
    )
  },
}
