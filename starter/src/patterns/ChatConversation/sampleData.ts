import type { ChatThreadItem } from './ChatConversation'

const user = (id: string, text: string, time: string): ChatThreadItem => ({ id, kind: 'message', from: 'user', text, time })
const agent = (id: string, text: string, time: string): ChatThreadItem => ({ id, kind: 'message', from: 'agent', agentName: 'Perry', text, time })

/** Dummy Chat threads, keyed by the id of the Chat conversation in the Conversation list (`chat-1` to `chat-8`). */
export const sampleChatThreads: Record<string, ChatThreadItem[]> = {
  'chat-1': [
    user('1', 'My dashboard is showing the wrong numbers since this morning', 'Nov 12, 10:01 AM'),
    agent('2', 'Thanks for reaching out. Let me take a look at your account.', 'Nov 12, 10:03 AM'),
    user('3', 'It says 0 conversations but we had at least 40 yesterday', 'Nov 12, 10:04 AM'),
    agent('4', 'Found it, a filter was left on. I have cleared it, please refresh.', 'Nov 12, 10:07 AM'),
  ],
  'chat-2': [
    user('1', 'I need to move my team to a different plan', 'Nov 12, 9:40 AM'),
    agent('2', 'Sure, happy to help with that! Which plan are you moving to?', 'Nov 12, 9:42 AM'),
  ],
  'chat-3': [
    user('1', 'Hi, is anyone there?', 'Nov 12, 9:18 AM'),
    agent('2', 'Hello', 'Nov 12, 9:20 AM'),
  ],
  'chat-4': [
    user('1', 'Can you share the invoice again?', 'Nov 12, 8:55 AM'),
  ],
  'chat-5': [
    user('1', 'The export keeps timing out for our biggest inbox', 'Nov 11, 4:10 PM'),
    agent('2', 'Sorry about that. How many conversations are in the inbox?', 'Nov 11, 4:12 PM'),
    user('3', 'About 20,000', 'Nov 11, 4:13 PM'),
    agent('4', 'Thanks, that fixed it!', 'Nov 11, 4:30 PM'),
  ],
  'chat-6': [
    user('1', 'My export keeps failing', 'Nov 11, 2:02 PM'),
  ],
  'chat-7': [
    user('1', 'Is there a way to merge two accounts?', 'Nov 10, 5:45 PM'),
  ],
  'chat-8': [
    user('1', 'How do I add a teammate to my workspace?', 'Nov 10, 1:15 PM'),
    agent('2', 'Go to Settings, then Members, then Invite.', 'Nov 10, 1:17 PM'),
    user('3', 'Got it, I will try that.', 'Nov 10, 1:19 PM'),
  ],
}

const waAgent = (id: string, text: string, time: string, status: 'sent' | 'delivered' | 'read'): ChatThreadItem => ({ id, kind: 'message', from: 'agent', agentName: 'Perry', text, time, status })

/** Dummy WhatsApp threads, keyed by the id of the WhatsApp conversation in the Conversation list (`whatsapp-1` to `whatsapp-7`). */
export const sampleWhatsAppThreads: Record<string, ChatThreadItem[]> = {
  'whatsapp-1': [
    user('1', 'Hi, I need help with my order', 'Nov 12, 10:01 AM'),
    waAgent('2', 'Hello! Could you share the order number?', 'Nov 12, 10:03 AM', 'read'),
    user('3', 'It is 48213', 'Nov 12, 10:04 AM'),
    waAgent('4', 'Thanks, checking it now.', 'Nov 12, 10:05 AM', 'delivered'),
  ],
  'whatsapp-2': [
    user('1', 'Can you send the details again?', 'Nov 12, 9:50 AM'),
    waAgent('2', 'Sure, sending the details now', 'Nov 12, 9:52 AM', 'read'),
  ],
  'whatsapp-3': [
    user('1', 'Is anyone there?', 'Nov 12, 10:00 AM'),
    waAgent('2', 'Hello', 'Nov 12, 10:05 AM', 'read'),
  ],
  'whatsapp-4': [
    user('1', 'Where is my refund?', 'Nov 11, 5:20 PM'),
  ],
  'whatsapp-5': [
    user('1', 'My package arrived damaged', 'Nov 11, 3:10 PM'),
    waAgent('2', 'Sorry to hear that. We will send a replacement.', 'Nov 11, 3:15 PM', 'read'),
    user('3', 'Thanks, all sorted', 'Nov 11, 3:20 PM'),
  ],
  'whatsapp-6': [
    user('1', 'Can I change my delivery address?', 'Nov 10, 6:00 PM'),
  ],
  'whatsapp-7': [
    user('1', 'Can you call me tomorrow?', 'Nov 10, 4:40 PM'),
    waAgent('2', 'I will call you back tomorrow', 'Nov 10, 4:45 PM', 'sent'),
  ],
}

/** Dummy SMS threads, keyed by the id of the SMS conversation in the Conversation list (`sms-1` to `sms-6`). */
export const sampleSmsThreads: Record<string, ChatThreadItem[]> = {
  'sms-1': [
    user('1', 'Need help resetting my account PIN', 'Nov 12, 10:00 AM'),
    agent('2', 'Hi', 'Nov 12, 10:02 AM'),
  ],
  'sms-2': [
    user('1', 'Your code is not working', 'Nov 12, 9:30 AM'),
  ],
  'sms-3': [
    user('1', 'Please call me back about my ticket', 'Nov 11, 3:00 PM'),
    agent('2', 'Calling you now', 'Nov 11, 3:05 PM'),
    user('3', 'Thanks!', 'Nov 11, 3:20 PM'),
  ],
  'sms-4': [
    user('1', 'STOP sending promo messages', 'Nov 11, 11:15 AM'),
  ],
  'sms-5': [
    user('1', 'Please confirm my appointment', 'Nov 10, 5:00 PM'),
  ],
  'sms-6': [
    user('1', 'Is the store open on Sunday?', 'Nov 10, 2:00 PM'),
    agent('2', 'Yes, from 10 AM to 4 PM', 'Nov 10, 2:10 PM'),
    user('3', 'Confirmed, see you then', 'Nov 10, 2:12 PM'),
  ],
}
