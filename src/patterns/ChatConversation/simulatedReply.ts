import type { ChatThreadItem } from './ChatConversation'

/** Generic things a customer might answer. Used to mimic a conversation in Storybook. */
const userReplies = [
  'Thanks, got it!',
  'Okay, will do.',
  'Great, thanks for the update.',
  'Perfect, appreciate it.',
  'Sounds good.',
  'Sure, let me check and get back to you.',
  'Thank you, that helps.',
]

/** Delay before the customer answers, in milliseconds. */
export const userReplyDelay = 2000

/** The time shown on a message sent right now, for example `Nov 12, 10:05 AM`. */
export const nowLabel = () => new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).replace(' at', ',')

/**
 * Mimics the customer: a moment after the agent sends a message, a generic reply from the customer arrives.
 * Call it right after adding the agent's message, and add the item it hands back to the thread.
 * Every conversation view (Chat, SMS, WhatsApp, and Slack when it is built) uses this in its stories and on the Home page.
 */
export function scheduleUserReply(add: (item: ChatThreadItem) => void) {
  setTimeout(() => {
    add({ id: `reply-${Date.now()}`, kind: 'message', from: 'user', text: userReplies[Math.floor(Math.random() * userReplies.length)], time: nowLabel() })
  }, userReplyDelay)
}
