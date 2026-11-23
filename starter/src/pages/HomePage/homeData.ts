import type { ConversationCardSla, ConversationCardTag, ConversationChannel } from '../../components/ConversationCard'
import type { CustomFieldValue } from '../../patterns/RightPanel'

/**
 * THE DATA OF THE HOME PAGE. Change this file to change the prototype; the page itself (HomePage.tsx) does not need to change.
 *
 * - `inboxes`: the inboxes in the sidebar, in order. Delete one to remove it. A channel is one of chat, whatsapp, sms, slack, email, voice.
 *   A channel can have several inboxes: give each a unique `id` and its own `label` and conversations (unique conversation ids too).
 * - Each inbox has `conversations`. Every conversation has a customer `name`, a `date` for its card and its `messages`, oldest first.
 *   The card's second line always shows the latest message (a message you sent shows with the reply arrow).
 * - `customFields`: the fields in the "Custom fields" section of the right panel. A `kind` is text, number or date.
 *   Keep a date as "YYYY-MM-DD". Leave `value` out for an empty field.
 */

/** One message in a conversation. */
export type HomeMessage = {
  from: 'customer' | 'agent'
  text: string
  /** The time shown on the message, for example "Nov 12, 10:05 AM". */
  time: string
  /** WhatsApp only, on an agent message: sent, delivered or read (ticks). */
  status?: 'sent' | 'delivered' | 'read'
  /** Slack only: the reactions on the message, for example { '👍': 2 }. */
  reactions?: Record<string, number>
}

export type HomeConversation = {
  /** Unique across the whole page, for example "sms-1". */
  id: string
  /** The customer's name, on the card and the conversation. */
  name: string
  /** The date or time on the card, for example "Nov 12" or "09:20 AM". */
  date: string
  /** Oldest first. Voice conversations have no messages. */
  messages: HomeMessage[]
  /** Starts unread: a blue dot and a bolder card until it is opened. */
  unread?: boolean
  /** SLA pills on the card, for example [{ kind: 'frt', status: 'overdue' }]. */
  sla?: ConversationCardSla[]
  /** Tags on the card, for example [{ label: 'High', color: 'red' }]. */
  tags?: ConversationCardTag[]
  /** How many more tags there are than shown ("+2"). */
  moreCount?: number
  /** Email only: the subject of the email conversation. */
  subject?: string
  /** Email only: the customer's address. */
  email?: string
  /** Slack only: the Slack channel the conversation is in, without the "#". */
  slackChannel?: string
  /** Voice only: whether the call was incoming or outgoing. */
  call?: 'incoming' | 'outgoing'
}

export type HomeInbox = {
  /** Only needed when a channel has several inboxes: a unique id for each, for example `email-2`. Leave out for the first or only one. */
  id?: string
  channel: ConversationChannel
  /** The name in the sidebar, for example "Website Chat". */
  label: string
  conversations: HomeConversation[]
}

export type HomeData = {
  inboxes: HomeInbox[]
  customFields: CustomFieldValue[]
}

const customer = (text: string, time: string): HomeMessage => ({ from: 'customer', text, time })
const agent = (text: string, time: string, status?: HomeMessage['status']): HomeMessage => ({ from: 'agent', text, time, status })
const frt: ConversationCardSla[] = [{ kind: 'frt', status: 'overdue' }]
const high: ConversationCardTag[] = [{ label: 'High', color: 'red' }, { label: 'Billing', color: 'lightBlue' }]
const low: ConversationCardTag[] = [{ label: 'Low', color: 'green' }]

/** The example data the starter page shows. */
export const homeData: HomeData = {
  inboxes: [
    {
      channel: 'chat', label: 'Website Chat',
      conversations: [
        { id: 'chat-1', name: 'Michael Scott', date: 'Nov 12', sla: frt, tags: high, moreCount: 1, messages: [customer('My dashboard is showing the wrong numbers since this morning', 'Nov 12, 10:01 AM'), agent('Thanks for reaching out. Let me take a look at your account.', 'Nov 12, 10:03 AM')] },
        { id: 'chat-2', name: 'Dwight Schrute', date: 'Nov 12', unread: true, messages: [customer('I need to move my team to a different plan', 'Nov 12, 09:40 AM')] },
        { id: 'chat-3', name: 'Pam Beesly', date: '09:20 AM', tags: low, messages: [customer('Is anyone there?', 'Nov 12, 09:18 AM'), agent('Hello', 'Nov 12, 09:20 AM')] },
      ],
    },
    {
      channel: 'whatsapp', label: 'WhatsApp',
      conversations: [
        { id: 'whatsapp-1', name: 'Michael Scott', date: 'Nov 12', sla: frt, tags: high, messages: [customer('Hi, I need help with my order', 'Nov 12, 10:01 AM'), agent('Hello! Could you share the order number?', 'Nov 12, 10:03 AM', 'read')] },
        { id: 'whatsapp-2', name: 'Darryl Philbin', date: 'Nov 12', unread: true, messages: [customer('Can you send the details again?', 'Nov 12, 09:50 AM')] },
        { id: 'whatsapp-3', name: 'Erin Hannon', date: '10:05 AM', messages: [customer('Is anyone there?', 'Nov 12, 10:00 AM'), agent('Hello', 'Nov 12, 10:05 AM', 'delivered')] },
      ],
    },
    {
      channel: 'sms', label: 'SMS',
      conversations: [
        { id: 'sms-1', name: 'Michael Scott', date: 'Nov 12', tags: high, messages: [customer('Need help resetting my account PIN', 'Nov 12, 10:00 AM'), agent('Hi', 'Nov 12, 10:02 AM')] },
        { id: 'sms-2', name: 'Pam Beesly', date: 'Nov 12', unread: true, messages: [customer('Your code is not working', 'Nov 12, 09:30 AM')] },
        { id: 'sms-3', name: 'Jim Halpert', date: 'Nov 11', messages: [customer('Please call me back about my ticket', 'Nov 11, 03:00 PM'), agent('Calling you now', 'Nov 11, 03:05 PM'), customer('Thanks!', 'Nov 11, 03:20 PM')] },
      ],
    },
    {
      channel: 'slack', label: 'Slack',
      conversations: [
        { id: 'slack-1', name: 'Phyllis Vance', date: 'Nov 12', sla: frt, slackChannel: 'support', messages: [customer('Hey, my order #404 is missing! Please help me out!', 'Nov 12, 04:11 PM'), { from: 'agent', text: 'Checking on that for you!', time: 'Nov 12, 04:12 PM', reactions: { '✅': 1 } }] },
        { id: 'slack-2', name: 'Creed Bratton', date: 'Nov 12', unread: true, slackChannel: 'escalations', messages: [customer('Can someone look at this today?', 'Nov 12, 11:02 AM')] },
      ],
    },
    {
      channel: 'email', label: 'Email',
      conversations: [
        { id: 'email-1', name: 'Michael Scott', date: 'Nov 12', subject: 'Question about my invoice', email: 'michael.scott@example.com', sla: frt, messages: [customer('Hi Support,\n\nI was charged twice for my annual renewal. Could you check invoice #4821?', 'Nov 12, 09:20 AM'), agent('Hello Michael,\n\nThanks for flagging this. I have started a refund for the second charge.', 'Nov 12, 09:45 AM'), customer('Thank you. How long will the refund take?', 'Nov 12, 10:02 AM')] },
        { id: 'email-2', name: 'Dwight Schrute', date: 'Nov 12', subject: 'Re: Beet farm onboarding', email: 'dwight.schrute@example.com', unread: true, messages: [customer('Hello,\n\nWhere can I find the onboarding checklist?', 'Nov 12, 08:10 AM')] },
      ],
    },
    {
      channel: 'voice', label: 'Voice',
      conversations: [
        { id: 'voice-1', name: 'Michael Scott', date: 'Nov 12', call: 'incoming', sla: frt, messages: [] },
        { id: 'voice-2', name: 'Dwight Schrute', date: 'Nov 12', call: 'outgoing', messages: [] },
      ],
    },
  ],
  customFields: [
    { id: 'mrr', label: 'MRR', kind: 'number', value: '1200' },
    { id: 'plan', label: 'Plan', kind: 'text', value: 'Enterprise' },
    { id: 'date', label: 'Date', kind: 'date' },
  ],
}
