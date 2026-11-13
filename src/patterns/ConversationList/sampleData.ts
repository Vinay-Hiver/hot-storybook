import type { ConversationCardProps, ConversationChannel } from '../../components/ConversationCard'

/** One conversation in the list: the props of a Conversation card, plus an id. */
export type ConversationListItem = Pick<ConversationCardProps, 'name' | 'date' | 'preview' | 'replied' | 'callDirection' | 'sla' | 'tags' | 'moreCount'> & { id: string }

const frtOverdue: ConversationCardProps['sla'] = [{ kind: 'frt', status: 'overdue' }]
const frtDue: ConversationCardProps['sla'] = [{ kind: 'frt', status: 'due' }]
const rtUpcoming: ConversationCardProps['sla'] = [{ kind: 'rt', status: 'upcoming' }]
const priorityHigh: ConversationCardProps['tags'] = [{ label: 'High', color: 'red' }, { label: 'Billing', color: 'lightBlue' }]
const priorityLow: ConversationCardProps['tags'] = [{ label: 'Low', color: 'green' }]
const priorityMedium: ConversationCardProps['tags'] = [{ label: 'Medium', color: 'yellow' }, { label: 'Refund', color: 'orange' }]

const item = (channel: string, n: number, rest: Omit<ConversationListItem, 'id'>): ConversationListItem => ({ id: `${channel}-${n}`, ...rest })

/** Dummy conversations for each channel. Every view of a channel shows the same list for now. */
export const sampleConversations: Record<ConversationChannel, ConversationListItem[]> = {
  chat: [
    item('chat', 1, { name: 'Michael Scott', date: 'Nov 12', preview: 'Chat was reopened by Perry', sla: frtOverdue, tags: priorityHigh, moreCount: 1 }),
    item('chat', 2, { name: 'Dwight Schrute', date: 'Nov 12', preview: 'Chat was reopened by Perry' }),
    item('chat', 3, { name: 'Pam Beesly', date: '09:20 AM', preview: 'Hello', replied: true }),
    item('chat', 4, { name: 'Jim Halpert', date: 'Nov 12', preview: 'Can you share the invoice again?', tags: priorityLow }),
    item('chat', 5, { name: 'Angela Martin', date: 'Nov 11', preview: 'Thanks, that fixed it!', replied: true }),
    item('chat', 6, { name: 'Kevin Malone', date: 'Nov 11', preview: 'My export keeps failing', sla: frtDue, tags: priorityMedium }),
    item('chat', 7, { name: 'Oscar Martinez', date: 'Nov 10', preview: 'Is there a way to merge two accounts?' }),
    item('chat', 8, { name: 'Stanley Hudson', date: 'Nov 10', preview: 'Got it, I will try that.', replied: true }),
  ],
  slack: [
    item('slack', 1, { name: 'Phyllis Vance', date: 'Nov 12', preview: 'Can someone look at this today?', sla: frtOverdue, tags: priorityHigh }),
    item('slack', 2, { name: 'Creed Bratton', date: 'Nov 12', preview: 'The new channel is not showing up' }),
    item('slack', 3, { name: 'Meredith Palmer', date: 'Nov 11', preview: 'Thanks for the quick reply' }),
    item('slack', 4, { name: 'Toby Flenderson', date: 'Nov 11', preview: 'Please add me to the support group', tags: priorityLow }),
    item('slack', 5, { name: 'Ryan Howard', date: 'Nov 10', preview: 'Following up on my earlier message', sla: frtDue }),
    item('slack', 6, { name: 'Kelly Kapoor', date: 'Nov 10', preview: 'Who owns the escalation for Acme?' }),
  ],
  whatsapp: [
    item('whatsapp', 1, { name: 'Michael Scott', date: 'Nov 12', preview: 'Hi, I need help with my order', sla: frtOverdue, tags: priorityHigh, moreCount: 2 }),
    item('whatsapp', 2, { name: 'Darryl Philbin', date: 'Nov 12', preview: 'Sure, sending the details now', replied: true }),
    item('whatsapp', 3, { name: 'Erin Hannon', date: '10:05 AM', preview: 'Hello', replied: true }),
    item('whatsapp', 4, { name: 'Andy Bernard', date: 'Nov 11', preview: 'Where is my refund?', tags: priorityMedium }),
    item('whatsapp', 5, { name: 'Gabe Lewis', date: 'Nov 11', preview: 'Thanks, all sorted', replied: true }),
    item('whatsapp', 6, { name: 'Holly Flax', date: 'Nov 10', preview: 'Can I change my delivery address?' }),
    item('whatsapp', 7, { name: 'Jan Levinson', date: 'Nov 10', preview: 'I will call you back tomorrow', replied: true, sla: rtUpcoming }),
  ],
  sms: [
    item('sms', 1, { name: 'Michael Scott', date: 'Nov 12', preview: 'Hi', replied: true, sla: frtOverdue, tags: priorityHigh }),
    item('sms', 2, { name: 'Pam Beesly', date: 'Nov 12', preview: 'Your code is not working' }),
    item('sms', 3, { name: 'Jim Halpert', date: 'Nov 11', preview: 'Thanks!', replied: true }),
    item('sms', 4, { name: 'Dwight Schrute', date: 'Nov 11', preview: 'Reply STOP to unsubscribe', tags: priorityLow }),
    item('sms', 5, { name: 'Angela Martin', date: 'Nov 10', preview: 'Please confirm my appointment', sla: frtDue }),
    item('sms', 6, { name: 'Oscar Martinez', date: 'Nov 10', preview: 'Confirmed, see you then', replied: true }),
  ],
  email: [
    item('email', 1, { name: 'Michael Scott', date: 'Nov 12', preview: 'Question about my invoice', sla: frtOverdue, tags: priorityHigh, moreCount: 2 }),
    item('email', 2, { name: 'Dwight Schrute', date: 'Nov 12', preview: 'Re: Beet farm onboarding' }),
    item('email', 3, { name: 'Pam Beesly', date: '09:20 AM', preview: 'Art class refund request', tags: priorityMedium }),
    item('email', 4, { name: 'Jim Halpert', date: 'Nov 11', preview: 'Prank insurance renewal' }),
    item('email', 5, { name: 'Angela Martin', date: 'Nov 11', preview: 'Cat allergy accommodation', sla: frtDue }),
    item('email', 6, { name: 'Kevin Malone', date: 'Nov 10', preview: 'Chili order is missing', tags: priorityLow }),
    item('email', 7, { name: 'Oscar Martinez', date: 'Nov 10', preview: 'Quarterly tax summary' }),
    item('email', 8, { name: 'Stanley Hudson', date: 'Nov 9', preview: 'Crossword subscription', sla: rtUpcoming }),
  ],
  voice: [
    item('voice', 1, { name: 'Michael Scott', date: 'Nov 12', callDirection: 'incoming', sla: frtOverdue }),
    item('voice', 2, { name: 'Dwight Schrute', date: 'Nov 12', callDirection: 'outgoing' }),
    item('voice', 3, { name: 'Pam Beesly', date: '09:20 AM', callDirection: 'incoming', tags: priorityLow }),
    item('voice', 4, { name: 'Jim Halpert', date: 'Nov 11', callDirection: 'outgoing' }),
    item('voice', 5, { name: 'Angela Martin', date: 'Nov 10', callDirection: 'incoming', sla: frtDue }),
  ],
}

/** How many conversations each channel has. The sidebar uses these as the counts of its views. */
export const conversationCounts: Record<ConversationChannel, number> = {
  chat: sampleConversations.chat.length,
  slack: sampleConversations.slack.length,
  whatsapp: sampleConversations.whatsapp.length,
  sms: sampleConversations.sms.length,
  email: sampleConversations.email.length,
  voice: sampleConversations.voice.length,
}
