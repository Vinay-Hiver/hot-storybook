import type { SlackThreadItem } from './slackThread'

const user = (id: string, text: string, time: string, reactions?: Record<string, number>): SlackThreadItem => ({ id, from: 'user', text, time, reactions })
const agent = (id: string, text: string, time: string, reactions?: Record<string, number>): SlackThreadItem => ({ id, from: 'agent', text, time, reactions })

/** The Slack channel each conversation in the Conversation list is in (`slack-1` to `slack-6`). */
export const sampleSlackChannels: Record<string, string> = {
  'slack-1': 'support',
  'slack-2': 'escalations',
  'slack-3': 'support',
  'slack-4': 'onboarding',
  'slack-5': 'support',
  'slack-6': 'escalations',
}

/** Dummy Slack threads, keyed by the id of the Slack conversation in the Conversation list. */
export const sampleSlackThreads: Record<string, SlackThreadItem[]> = {
  'slack-1': [
    user('1', 'Hey, my order #404 is missing! Please help me out!', 'Nov 12, 04:11 PM'),
    agent('2', 'Checking on that for you!', 'Nov 12, 04:12 PM', { '😀': 1, '✅': 1 }),
    user('3', 'I am unable to find tracking details\nIt’s been more than a week', 'Nov 12, 04:14 PM', { '😀': 1, '✅': 1 }),
    agent('4', 'Package will be delivered today!', 'Nov 12, 04:20 PM'),
  ],
  'slack-2': [
    user('1', 'Can someone look at this today?', 'Nov 12, 11:02 AM'),
    agent('2', 'On it. Can you share the account name?', 'Nov 12, 11:05 AM'),
  ],
  'slack-3': [
    user('1', 'The new channel is not showing up', 'Nov 11, 03:30 PM'),
    agent('2', 'Thanks for flagging, I am checking the integration.', 'Nov 11, 03:34 PM', { '👀': 1 }),
    user('3', 'Thanks for the quick reply', 'Nov 11, 03:40 PM'),
  ],
  'slack-4': [
    user('1', 'Please add me to the support group', 'Nov 11, 10:15 AM'),
  ],
  'slack-5': [
    user('1', 'Following up on my earlier message', 'Nov 10, 05:45 PM'),
    agent('2', 'Sorry for the wait, replying shortly.', 'Nov 10, 05:50 PM'),
  ],
  'slack-6': [
    user('1', 'Who owns the escalation for Acme?', 'Nov 10, 02:20 PM'),
  ],
}
