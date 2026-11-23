import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ConversationChannel } from '../../components/ConversationCard'
import { sampleChatThreads, sampleSmsThreads, sampleWhatsAppThreads } from '../../patterns/ChatConversation/sampleData'
import { emailAgentAddress } from '../../patterns/EmailConversation/emailThread'
import { sampleEmails } from '../../patterns/EmailConversation/sampleData'
import { sampleConversations } from '../../patterns/ConversationList/sampleData'
import { sampleSlackChannels, sampleSlackThreads } from '../../patterns/SlackConversation/sampleData'
import { HomePage } from './HomePage'
import { homeData } from './homeData'
import type { HomeConversation, HomeData, HomeMessage } from './homeData'

const meta = {
  title: 'Pages/Home page',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta

const labels: Record<ConversationChannel, string> = { chat: 'Website Chat', slack: 'Slack', whatsapp: 'WhatsApp', sms: 'SMS', email: 'Email', voice: 'Voice' }
const order: ConversationChannel[] = ['chat', 'slack', 'whatsapp', 'sms', 'email', 'voice']
const chatThreads = { ...sampleChatThreads, ...sampleWhatsAppThreads, ...sampleSmsThreads }

/** The messages of a conversation, read from the dummy threads of its channel. */
function messagesOf(id: string): HomeMessage[] {
  const chat = chatThreads[id]
  if (chat) return chat.flatMap((m) => (m.kind === 'message' ? [{ from: m.from === 'user' ? 'customer' : 'agent', text: m.text, time: m.time, status: m.status } as HomeMessage] : []))
  const slack = sampleSlackThreads[id]
  if (slack) return slack.map((m) => ({ from: m.from === 'user' ? 'customer' : 'agent', text: m.text, time: m.time, reactions: m.reactions }))
  const email = sampleEmails[id]
  if (email) return email.messages.map((m) => ({ from: m.email === emailAgentAddress ? 'agent' : 'customer', text: m.body, time: m.time }))
  return []
}

/** All the dummy conversations of the Conversation list (every channel, 5 to 8 each), written in the shape of the Home page's data file. */
const fullData: HomeData = {
  customFields: homeData.customFields,
  inboxes: order.map((channel) => ({
    channel,
    label: labels[channel],
    conversations: sampleConversations[channel].map((c): HomeConversation => ({
      id: c.id,
      name: c.name,
      date: c.date,
      unread: c.unread,
      sla: c.sla,
      tags: c.tags,
      moreCount: c.moreCount,
      call: c.callDirection,
      messages: messagesOf(c.id),
      subject: sampleEmails[c.id]?.subject,
      email: sampleEmails[c.id]?.customerEmail,
      slackChannel: sampleSlackChannels[c.id],
    })),
  })),
}

/** The home page: Main nav, Conversations sidebar, the Conversation list for the chosen view, the conversation, and the Right panel. All the channels are filled with dummy conversations here. Prototypes use the same page with their own data (`homeData.ts`). */
export const Playground: StoryObj = {
  render: () => <HomePage data={fullData} />,
}
