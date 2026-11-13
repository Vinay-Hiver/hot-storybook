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
